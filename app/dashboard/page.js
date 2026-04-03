"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
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

function createReview({ customerName, businessName, rating, reviewText }) {
  return {
    id: crypto.randomUUID(),
    customerName: customerName.trim(),
    businessName: businessName.trim(),
    rating,
    reviewText: reviewText.trim(),
    replyText: "",
    source: "",
    status: "needs-reply",
    createdAt: new Date().toISOString(),
  };
}

function starsForRating(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReviewId, setActiveReviewId] = useState("");
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);
  const [form, setForm] = useState({
    customerName: "",
    businessName: "Replyo Demo Location",
    rating: 5,
    reviewText: "",
  });

  useEffect(() => {
    try {
      const storedReviews = readStoredValue(REVIEWS_STORAGE_KEY, defaultReviews);
      const storedSettings = readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings);
      const storedConnection = readStoredValue(
        CONNECTION_STORAGE_KEY,
        defaultConnection
      );

      setReviews(storedReviews.length ? storedReviews : defaultReviews);
      setSettings(storedSettings);
      setConnection(storedConnection);
    } catch (error) {
      console.error("Failed to load dashboard reviews:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    writeStoredValue(REVIEWS_STORAGE_KEY, reviews);
  }, [isLoaded, reviews]);

  function handleFormChange(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleAddReview(event) {
    event.preventDefault();

    if (!form.customerName.trim() || !form.reviewText.trim()) {
      return;
    }

    const nextReview = createReview(form);

    setReviews((current) => [nextReview, ...current]);
    setForm({
      customerName: "",
      businessName: form.businessName.trim() || "Replyo Demo Location",
      rating: 5,
      reviewText: "",
    });
  }

  async function handleGenerateReply(reviewId) {
    const currentReview = reviews.find((review) => review.id === reviewId);

    if (!currentReview) {
      return;
    }

    setActiveReviewId(reviewId);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: currentReview.reviewText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate a reply.");
      }

      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                replyText: data.reply,
                source: data.source,
                status: "ready",
              }
            : review
        )
      );
    } catch (error) {
      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                replyText:
                  error.message || "We could not generate a reply right now.",
                source: "error",
                status: "error",
              }
            : review
        )
      );
    } finally {
      setIsSubmitting(false);
      setActiveReviewId("");
    }
  }

  function handleDeleteReview(reviewId) {
    setReviews((current) => current.filter((review) => review.id !== reviewId));
  }

  const readyCount = reviews.filter((review) => review.status === "ready").length;
  const pendingCount = reviews.filter((review) => review.status === "needs-reply").length;
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  const repliesGenerated = reviews.filter((review) => review.replyText).length;
  const activePlan = "Starter";
  const postedCount = reviews.filter((review) => review.status === "posted").length;

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>Loading...</main>;
  }

  if (!session) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          background:
            "radial-gradient(circle at top left, #fff4d8 0%, #f7f4ec 35%, #eef3ff 100%)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            background: "#fff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#172033", marginBottom: "12px" }}>
            You need to log in to access the dashboard
          </h2>
          <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "20px" }}>
            Use the demo account or return to the login page to continue.
          </p>
          <div style={{ display: "grid", gap: "12px" }}>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px 16px",
                fontWeight: "600",
              }}
            >
              Go to login
            </Link>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                background: "#eff3fb",
                color: "#172033",
                borderRadius: "14px",
                padding: "14px 16px",
                fontWeight: "600",
              }}
            >
              Use demo signup
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff4d8 0%, #f7f4ec 35%, #eef3ff 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#444" }}>
            ← Back to Home
          </Link>

          <button
            onClick={() => signOut()}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            alignItems: "stretch",
            marginBottom: "24px",
          }}
        >
          <section
            style={{
              background: "#171717",
              color: "#fff7e8",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(20,20,20,0.15)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.1)",
                fontSize: "13px",
                marginBottom: "18px",
              }}
            >
              Live reply workspace
            </div>

            <h1 style={{ fontSize: "40px", marginBottom: "12px", color: "#ffffff" }}>
              Welcome back, {session.user?.name || "User"}
            </h1>

            <p
              style={{
                color: "rgba(255,247,232,0.78)",
                fontSize: "18px",
                lineHeight: 1.6,
                maxWidth: "640px",
              }}
            >
              Capture new reviews, generate polished replies, and keep a lightweight
              queue of what still needs attention.
            </p>
          </section>

          <section
            style={{
              background: "rgba(255,255,255,0.86)",
              backdropFilter: "blur(14px)",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 40px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ marginBottom: "8px", fontSize: "22px", color: "#1f2937" }}>
              Your account
            </h2>
            <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: "20px" }}>
              <strong>Name:</strong> {session.user?.name || "Not available"}
              <br />
              <strong>Email:</strong> {session.user?.email || "Not available"}
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  background: "#fff8e6",
                  borderRadius: "16px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#8b5e00", marginBottom: "6px" }}>
                  Average rating tracked
                </div>
                <div style={{ fontSize: "28px", color: "#1f2937", fontWeight: "700" }}>
                  {averageRating}
                </div>
              </div>
              <div
                style={{
                  background: "#eef6ff",
                  borderRadius: "16px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#31598e", marginBottom: "6px" }}>
                  Replies ready to send
                </div>
                <div style={{ fontSize: "28px", color: "#1f2937", fontWeight: "700" }}>
                  {readyCount}
                </div>
              </div>
              <div
                style={{
                  background: "#eefbf3",
                  borderRadius: "16px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#1f7a45", marginBottom: "6px" }}>
                  Active plan
                </div>
                <div style={{ fontSize: "28px", color: "#1f2937", fontWeight: "700" }}>
                  {activePlan}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          {[
            ["Replies generated", repliesGenerated, "#f5f8ff", "#5a6b89"],
            ["Pending reviews", pendingCount, "#fff6df", "#8b5e00"],
            [
              "Connected location",
              connection.isConnected ? connection.selectedLocationName : "None",
              "#eefbf3",
              "#1f7a45",
            ],
            ["Billing status", "Active", "#fff4f2", "#9f1c00"],
          ].map(([label, value, background, color]) => (
            <div
              key={label}
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "20px",
                boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background,
                  color,
                  borderRadius: "999px",
                  padding: "7px 10px",
                  fontSize: "12px",
                  marginBottom: "12px",
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: "34px", color: "#172033", fontWeight: "700" }}>
                {value}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "22px",
              boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "22px", color: "#172033", marginBottom: "10px" }}>
              Workspace
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              Connect a business, open your inbox, and decide whether Replyo should
              post directly or wait for approval first.
            </p>
            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                href="/inbox"
                style={{
                  textDecoration: "none",
                  background: "#172033",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Open review inbox
              </Link>
              <Link
                href="/connect-google"
                style={{
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Connect Google Business
              </Link>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "22px",
              boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "22px", color: "#172033", marginBottom: "10px" }}>
              Account controls
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              Current mode:{" "}
              <strong>
                {settings.replyMode === "auto"
                  ? "Replyo posts automatically"
                  : "You approve replies before posting"}
              </strong>
              .
            </p>
            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                href="/settings"
                style={{
                  textDecoration: "none",
                  background: "#172033",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Open settings
              </Link>
              <Link
                href="/inbox"
                style={{
                  textDecoration: "none",
                  background: "#effbf3",
                  color: "#1f7a45",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Posted replies: {postedCount}
              </Link>
              <Link
                href="/pricing"
                style={{
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Manage plan
              </Link>
            </div>
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
          }}
        >
          <section
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "22px",
              boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
              alignSelf: "start",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#111827" }}>
              Add a review
            </h2>
            <p style={{ color: "#6b7280", lineHeight: 1.6, marginBottom: "20px" }}>
              Build your queue manually for now while we shape the product around real
              customer feedback.
            </p>

            <form onSubmit={handleAddReview} style={{ display: "grid", gap: "14px" }}>
              <input
                type="text"
                value={form.customerName}
                onChange={(event) => handleFormChange("customerName", event.target.value)}
                placeholder="Customer name"
                style={{
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                }}
              />

              <input
                type="text"
                value={form.businessName}
                onChange={(event) => handleFormChange("businessName", event.target.value)}
                placeholder="Business name"
                style={{
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                }}
              />

              <label style={{ display: "grid", gap: "8px", color: "#374151", fontSize: "14px" }}>
                Star rating
                <select
                  value={form.rating}
                  onChange={(event) =>
                    handleFormChange("rating", Number(event.target.value))
                  }
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    background: "#fff",
                  }}
                >
                  <option value={5}>5 stars</option>
                  <option value={4}>4 stars</option>
                  <option value={3}>3 stars</option>
                  <option value={2}>2 stars</option>
                  <option value={1}>1 star</option>
                </select>
              </label>

              <textarea
                value={form.reviewText}
                onChange={(event) => handleFormChange("reviewText", event.target.value)}
                placeholder="Paste the customer review here..."
                style={{
                  minHeight: "160px",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  resize: "vertical",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: 1.6,
                }}
              />

              <button
                type="submit"
                style={{
                  background: "#111827",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Save review to queue
              </button>
            </form>

            <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
              <div
                style={{
                  background: "#fff6df",
                  borderRadius: "16px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#8b5e00", marginBottom: "6px" }}>
                  Needs reply
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#1f2937" }}>
                  {pendingCount}
                </div>
              </div>
              <div
                style={{
                  background: "#eefbf3",
                  borderRadius: "16px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#1f7a45", marginBottom: "6px" }}>
                  Reviews saved
                </div>
                <div style={{ fontSize: "26px", fontWeight: "700", color: "#1f2937" }}>
                  {reviews.length}
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {!isLoaded ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
                  color: "#4b5563",
                }}
              >
                Loading your review queue...
              </div>
            ) : reviews.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "28px",
                  boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
                }}
              >
                <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#111827" }}>
                  Your queue is empty
                </h2>
                <p style={{ color: "#6b7280", lineHeight: 1.7, maxWidth: "640px" }}>
                  Add a review on the left, then generate a draft reply. Everything is
                  stored locally in this browser so you can keep iterating on the MVP
                  without setting up a database yet.
                </p>
              </div>
            ) : (
              reviews.map((review) => {
                const isGenerating = isSubmitting && activeReviewId === review.id;
                const statusLabel =
                  review.status === "ready"
                    ? "Reply ready"
                    : review.status === "error"
                      ? "Needs retry"
                      : "Waiting for reply";

                return (
                  <article
                    key={review.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "24px",
                      padding: "22px",
                      boxShadow: "0 14px 40px rgba(82,95,127,0.12)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap",
                        marginBottom: "18px",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                          {review.businessName}
                        </div>
                        <h3 style={{ fontSize: "24px", color: "#111827", marginBottom: "8px" }}>
                          {review.customerName}
                        </h3>
                        <div style={{ color: "#d97706", fontSize: "18px", letterSpacing: "1px" }}>
                          {starsForRating(review.rating)}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          height: "fit-content",
                          padding: "8px 12px",
                          borderRadius: "999px",
                          background:
                            review.status === "ready"
                              ? "#e9f9ef"
                              : review.status === "error"
                                ? "#fff1f0"
                                : "#fff8e6",
                          color:
                            review.status === "ready"
                              ? "#1f7a45"
                              : review.status === "error"
                                ? "#b42318"
                                : "#8b5e00",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {statusLabel}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "18px",
                        marginBottom: "18px",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "20px",
                          background: "#f8fafc",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>
                          Customer review
                        </div>
                        <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                          {review.reviewText}
                        </p>
                      </div>

                      <div
                        style={{
                          borderRadius: "20px",
                          background:
                            review.status === "error" ? "#fff6f5" : "#f7f9ff",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>
                          Draft reply
                        </div>
                        <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                          {review.replyText || "Generate a reply to see your draft here."}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ color: "#6b7280", fontSize: "14px" }}>
                        {review.source
                          ? `Source: ${review.source}`
                          : "Source will appear after generation"}
                      </div>

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          onClick={() => handleGenerateReply(review.id)}
                          disabled={isGenerating}
                          style={{
                            background: "#111827",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "14px",
                            padding: "12px 16px",
                            fontSize: "15px",
                            cursor: isGenerating ? "wait" : "pointer",
                            opacity: isGenerating ? 0.7 : 1,
                          }}
                        >
                          {isGenerating ? "Generating..." : "Generate reply"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteReview(review.id)}
                          style={{
                            background: "#f3f4f6",
                            color: "#111827",
                            border: "1px solid #d1d5db",
                            borderRadius: "14px",
                            padding: "12px 16px",
                            fontSize: "15px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default DashboardContent;
