"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestReplyoPage() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateReply() {
    if (!review.trim()) {
      setReply("Please enter a review first.");
      setSource("error");
      return;
    }

    setIsLoading(true);
    setReply("");
    setSource("");

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      const data = await res.json();

      if (!res.ok) {
        setReply(data.error || "Something went wrong.");
        setSource("error");
        return;
      }

      setReply(data.reply);
      setSource(data.source || "");
    } catch (error) {
      setReply("Failed to generate reply.");
      setSource("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#444" }}>
            ← Back to Home
          </Link>
        </div>

        <h1 style={{ fontSize: "38px", marginBottom: "10px", color: "#222" }}>
          Test Replyo
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          See how Replyo turns a customer review into a professional business reply.
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "18px" }}>
            Google Review Preview
          </h2>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "18px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#e8eefc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#335",
                }}
              >
                M
              </div>

              <div>
                <div style={{ fontWeight: "bold", color: "#222" }}>
                  Marie Client
                </div>
                <div style={{ fontSize: "14px", color: "#777" }}>
                  Local Guide • 12 reviews
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                color: "#f4b400",
              }}
            >
              ★★★★★
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write or paste a customer review here..."
              style={{
                width: "100%",
                minHeight: "120px",
                border: "none",
                outline: "none",
                resize: "vertical",
                fontSize: "16px",
                color: "#333",
                fontFamily: "Arial, sans-serif",
                lineHeight: 1.6,
              }}
            />
          </div>

          <button
            onClick={generateReply}
            disabled={isLoading}
            style={{
              marginTop: "18px",
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "14px 22px",
              borderRadius: "12px",
              fontSize: "16px",
              cursor: isLoading ? "wait" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Generating..." : "Generate Reply"}
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "18px" }}>
            Business Reply
          </h2>

          <div
            style={{
              borderLeft: "4px solid #4285F4",
              background: "#f9fbff",
              borderRadius: "12px",
              padding: "18px",
              color: "#333",
              lineHeight: 1.7,
              minHeight: "126px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Reply from the owner</div>
              {source ? (
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: source === "openai" ? "#0f6c3b" : "#8a5a00",
                    background: source === "openai" ? "#e8f7ee" : "#fff4d6",
                    padding: "6px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {source === "openai" ? "Generated with AI" : source === "fallback" ? "Fallback reply" : "Error"}
                </div>
              ) : null}
            </div>
            <div
              style={{
                color: reply ? "#333" : "#667085",
              }}
            >
              {isLoading
                ? "Replyo is writing a professional response..."
                : reply || "Your AI-generated reply will appear here."}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
