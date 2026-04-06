"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function WhyReplyoPage() {
  const { t, language } = useLanguage();
  const reasons = t.why.reasons.slice(0, 3);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07090d",
        fontFamily: "Arial, sans-serif",
        color: "#f8fafc",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "clamp(28px, 7vw, 72px) clamp(18px, 5vw, 32px) 88px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            color: "rgba(248,250,252,0.62)",
            textDecoration: "none",
            marginBottom: "30px",
          }}
        >
          ← Home
        </Link>

        <div style={{ maxWidth: "760px", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(248,250,252,0.62)",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {t.why.badge}
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 68px)",
              lineHeight: 0.95,
              letterSpacing: "-0.07em",
              marginBottom: "18px",
            }}
          >
            {t.why.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 2.8vw, 19px)",
              lineHeight: 1.7,
              color: "rgba(248,250,252,0.64)",
              margin: 0,
              maxWidth: "620px",
            }}
          >
            {t.why.description}
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(248,250,252,0.64)",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              {t.why.coreBadge}
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                lineHeight: 1.04,
                letterSpacing: "-0.05em",
                marginBottom: "12px",
              }}
            >
              {t.why.coreTitle}
            </h2>
            <p style={{ color: "rgba(248,250,252,0.68)", lineHeight: 1.8, marginBottom: "16px" }}>
              {t.why.coreText}
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              {t.why.extra.slice(0, 3).map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "18px",
                    padding: "12px 14px",
                    color: "rgba(248,250,252,0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(248,250,252,0.64)",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              {t.why.customerBadge}
            </div>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.why.customerItems.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "14px 16px",
                    color: "rgba(248,250,252,0.74)",
                    lineHeight: 1.65,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            paddingTop: "8px",
            marginBottom: "28px",
          }}
        >
          <div style={{ maxWidth: "760px", marginBottom: "18px" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 40px)",
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                marginBottom: "12px",
              }}
            >
              {t.why.reasonsTitle}
            </h2>
            <p style={{ color: "rgba(248,250,252,0.66)", lineHeight: 1.8, margin: 0 }}>
              {t.why.reasonsText}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {reasons.map(([title, text], index) => (
              <article
                key={title}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "800",
                    marginBottom: "14px",
                  }}
                >
                  0{index + 1}
                </div>
                <h3 style={{ fontSize: "24px", lineHeight: 1.15, marginBottom: "10px" }}>
                  {title}
                </h3>
                <p style={{ color: "rgba(248,250,252,0.66)", lineHeight: 1.75, margin: 0 }}>
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/how-it-works"
            style={{
              textDecoration: "none",
              background: "transparent",
              color: "#ffffff",
              padding: "15px 20px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              fontWeight: "700",
            }}
          >
            {t.why.how}
          </Link>
          <Link
            href="/signup"
            style={{
              textDecoration: "none",
              background: "#ffffff",
              color: "#07090d",
              padding: "15px 20px",
              borderRadius: "14px",
              fontWeight: "700",
            }}
          >
            {t.why.create}
          </Link>
        </div>
      </section>
    </main>
  );
}
