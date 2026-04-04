"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function HowItWorksPage() {
  const { t, language } = useLanguage();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#172033",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "clamp(32px, 8vw, 72px) clamp(18px, 5vw, 28px) clamp(48px, 10vw, 96px)",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            marginBottom: "34px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#fff0c2",
              color: "#7a5600",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "18px",
            }}
          >
            {t.how.badge}
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 9vw, 54px)",
              lineHeight: 1.05,
              marginBottom: "18px",
              maxWidth: "760px",
            }}
          >
            {t.how.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 4.4vw, 19px)",
              lineHeight: 1.75,
              color: "#556070",
              maxWidth: "700px",
              margin: 0,
            }}
          >
            {t.how.description}
          </p>
        </div>

        <section
          style={{
            background: "rgba(255,255,255,0.84)",
            border: "1px solid rgba(23,32,51,0.08)",
            borderRadius: "30px",
            padding: "clamp(18px, 4vw, 26px)",
            boxShadow: "0 22px 50px rgba(48,63,90,0.1)",
            marginBottom: "24px",
            perspective: "1400px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "18px",
            }}
          >
            {t.how.steps.map(([title, text], index) => (
              <article
                key={title}
                className="replyo-how-step-card"
                style={{
                  borderRadius: "24px",
                  padding: "22px",
                  border: "1px solid #e4e9f2",
                  boxShadow: "0 14px 30px rgba(82,95,127,0.08)",
                }}
              >
                <div
                  className="replyo-how-step-label"
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "10px",
                    letterSpacing: "0.08em",
                  }}
                >
                  {t.how.stepLabel} {String(index + 1).padStart(2, "0")}
                </div>
                <h2
                  className="replyo-how-step-title"
                  style={{
                    fontSize: "clamp(22px, 5vw, 24px)",
                    lineHeight: 1.25,
                    marginBottom: "10px",
                  }}
                >
                  {title}
                </h2>
                <p
                  className="replyo-how-step-text"
                  style={{
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "28px",
            padding: "clamp(20px, 5vw, 30px)",
            boxShadow: "0 22px 50px rgba(23,32,51,0.18)",
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
            {t.how.whyBadge}
          </div>
          <h2 style={{ fontSize: "clamp(28px, 7vw, 34px)", lineHeight: 1.1, marginBottom: "14px" }}>
            {t.how.whyTitle}
          </h2>
          <p
            style={{
              maxWidth: "760px",
              color: "rgba(255,248,236,0.82)",
              lineHeight: 1.75,
              marginBottom: "20px",
            }}
          >
            {t.how.whyText}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "12px",
            }}
          >
            {t.how.benefits.map((benefit) => (
              <div
                key={benefit}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  padding: "14px 16px",
                  lineHeight: 1.6,
                }}
              >
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "rgba(255,255,255,0.84)",
            border: "1px solid rgba(23,32,51,0.08)",
            borderRadius: "28px",
            padding: "clamp(20px, 5vw, 28px)",
            boxShadow: "0 22px 50px rgba(48,63,90,0.1)",
            display: "flex",
            justifyContent: "space-between",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "650px" }}>
            <h2 style={{ fontSize: "clamp(28px, 7vw, 34px)", lineHeight: 1.1, marginBottom: "10px" }}>
              {t.how.ctaTitle}
            </h2>
            <p style={{ color: "#5b6474", lineHeight: 1.75, margin: 0 }}>{t.how.ctaText}</p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{
                textDecoration: "none",
                background: "#172033",
                color: "#fff",
                padding: "15px 20px",
                borderRadius: "14px",
                fontWeight: "600",
              }}
            >
              {t.how.create}
            </Link>
            <Link
              href="/test-replyo"
              style={{
                textDecoration: "none",
                background: "#fff",
                color: "#172033",
                padding: "15px 20px",
                borderRadius: "14px",
                border: "1px solid rgba(23,32,51,0.12)",
                fontWeight: "600",
              }}
            >
              {t.how.test}
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
