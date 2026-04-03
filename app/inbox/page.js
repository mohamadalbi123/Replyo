"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import {
  CONNECTION_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  defaultConnection,
  defaultReviews,
  defaultSettings,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

function InboxContent() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);
  const [activeReviewId, setActiveReviewId] = useState("");

  useEffect(() => {
    const storedReviews = readStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    const storedSettings = {
      ...defaultSettings,
      ...readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings),
    };
    const storedConnection = {
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    };

    setReviews(storedReviews.length ? storedReviews : defaultReviews);
    setSettings(storedSettings);
    setConnection(storedConnection);

    if (!storedReviews.length) {
      writeStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
    }
  }, []);

  function updateReviews(nextReviews) {
    setReviews(nextReviews);
    writeStoredValue(REVIEWS_STORAGE_KEY, nextReviews);
  }

  async function handleGenerate(reviewId) {
    const currentReview = reviews.find((review) => review.id === reviewId);

    if (!currentReview) {
      return;
    }

    setActiveReviewId(reviewId);

    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: currentReview.reviewText,
          rating: currentReview.rating,
          businessType:
            connection.selectedLocationCategory ||
            connection.selectedLocationType ||
            currentReview.businessType,
          businessName: connection.selectedLocationName || currentReview.businessName,
          tone: settings.tone,
          smartPersonalization: settings.smartPersonalization,
        }),
      });

      const data = await response.json();

      const nextStatus = settings.replyMode === "auto" ? "posted" : "ready";
      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replyText: data.reply,
              source: data.source,
              status: nextStatus,
              detectedSentiment: data.context?.sentiment || review.detectedSentiment,
              detectedTopics: data.context?.detectedTopics || review.detectedTopics,
              businessType:
                connection.selectedLocationType || review.businessType,
              postedAt:
                settings.replyMode === "auto" ? new Date().toISOString() : "",
            }
          : review
      );

      updateReviews(nextReviews);
    } catch (error) {
      const nextReviews = reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: "error",
              replyText: "Reply generation failed. Please try again.",
              source: "error",
            }
          : review
      );

      updateReviews(nextReviews);
    } finally {
      setActiveReviewId("");
    }
  }

  function handlePost(reviewId) {
    const nextReviews = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            status: "posted",
            postedAt: new Date().toISOString(),
          }
        : review
    );

    updateReviews(nextReviews);
  }

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>Loading inbox...</main>;
  }

  if (!session) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h2>You must be logged in to access the review inbox</h2>
        <button
          onClick={() => signIn("credentials")}
          style={{
            marginTop: "20px",
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </main>
    );
  }

  const pendingCount = reviews.filter((review) => review.status === "needs-reply").length;
  const readyCount = reviews.filter((review) => review.status === "ready").length;
  const postedCount = reviews.filter((review) => review.status === "posted").length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        padding: "48px 20px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <Link href="/dashboard" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← Back to dashboard
          </Link>
          <button
            onClick={() => signOut()}
            style={{
              background: "#172033",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            Review inbox
          </div>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
            New reviews, draft replies, and posting status in one place.
          </h1>
          <p style={{ color: "rgba(255,248,236,0.8)", lineHeight: 1.7, margin: 0 }}>
            Replyo can either post directly when you trust the automation or hold the
            draft for your approval first.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          {[
            ["Connected business", connection.selectedLocationName || "Not connected"],
            ["Reply mode", settings.replyMode === "auto" ? "Auto-post" : "Approval"],
            ["Pending", pendingCount],
            ["Ready", readyCount],
            ["Posted", postedCount],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "#fff",
                borderRadius: "22px",
                padding: "20px",
                boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
              }}
            >
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                {label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#172033" }}>
                {value}
              </div>
            </div>
          ))}
        </section>

        {!connection.isConnected ? (
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "10px" }}>
              No connected business yet
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              Connect a business first so Replyo knows which Google Business Profile it
              should monitor for new reviews.
            </p>
            <Link
              href="/connect-google"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "13px 16px",
                fontWeight: "600",
              }}
            >
              Connect Google Business
            </Link>
          </section>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {reviews.map((review) => (
              <article
                key={review.id}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "22px",
                  boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                      {review.businessName}
                    </div>
                    <h2 style={{ fontSize: "24px", color: "#172033", margin: 0 }}>
                      {review.customerName}
                    </h2>
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          background: "#f5f8ff",
                          color: "#31598e",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {review.rating}/5 stars
                      </span>
                      <span
                        style={{
                          background: "#f5f8ff",
                          color: "#31598e",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {connection.selectedLocationCategory ||
                          review.businessType ||
                          "Local business"}
                      </span>
                      {review.detectedSentiment ? (
                        <span
                          style={{
                            background: "#fff6df",
                            color: "#8b5e00",
                            borderRadius: "999px",
                            padding: "6px 10px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {review.detectedSentiment}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background:
                        review.status === "posted"
                          ? "#eefbf3"
                          : review.status === "ready"
                            ? "#eef6ff"
                            : review.status === "error"
                              ? "#fff4f2"
                              : "#fff6df",
                      color:
                        review.status === "posted"
                          ? "#1f7a45"
                          : review.status === "ready"
                            ? "#31598e"
                            : review.status === "error"
                              ? "#9f1c00"
                              : "#8b5e00",
                      fontSize: "13px",
                      fontWeight: "600",
                      height: "fit-content",
                    }}
                  >
                    {review.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "18px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                      Review
                    </div>
                    <div style={{ color: "#344054", lineHeight: 1.7 }}>{review.reviewText}</div>
                  </div>
                  <div
                    style={{
                      background: "#f9fbff",
                      borderRadius: "18px",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                      Reply draft
                    </div>
                    <div style={{ color: "#344054", lineHeight: 1.7 }}>
                      {review.replyText || "No reply generated yet."}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  {(review.detectedTopics || []).map((topic) => (
                    <span
                      key={topic}
                      style={{
                        background: "#eef6ff",
                        color: "#31598e",
                        borderRadius: "999px",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                  <span
                    style={{
                      background: "#effbf3",
                      color: "#1f7a45",
                      borderRadius: "999px",
                      padding: "8px 10px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Tone: {settings.tone}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => handleGenerate(review.id)}
                    disabled={activeReviewId === review.id}
                    style={{
                      background: "#172033",
                      color: "#fff",
                      border: "none",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      cursor: activeReviewId === review.id ? "wait" : "pointer",
                      opacity: activeReviewId === review.id ? 0.7 : 1,
                    }}
                  >
                    {activeReviewId === review.id ? "Generating..." : "Generate reply"}
                  </button>
                  {review.status === "ready" ? (
                    <button
                      type="button"
                      onClick={() => handlePost(review.id)}
                      style={{
                        background: "#eefbf3",
                        color: "#1f7a45",
                        border: "1px solid #b8e3c6",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                    >
                      Approve and post
                    </button>
                  ) : null}
                  <Link
                    href="/settings"
                    style={{
                      textDecoration: "none",
                      background: "#eff3fb",
                      color: "#172033",
                      borderRadius: "14px",
                      padding: "12px 14px",
                    }}
                  >
                    Change mode
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function InboxPage() {
  return (
    <SessionProvider>
      <InboxContent />
    </SessionProvider>
  );
}
