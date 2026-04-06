"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function HowItWorksPage() {
  const { t, language } = useLanguage();
  const steps = t.how.steps.slice(0, 4);
  const benefits = t.how.benefits.slice(0, 3);

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
            {t.how.badge}
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 68px)",
              lineHeight: 0.96,
              letterSpacing: "-0.07em",
              marginBottom: "18px",
            }}
          >
            {t.how.title}
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
            {t.how.description}
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            marginBottom: "44px",
          }}
        >
          {steps.map(([title, text], index) => (
            <article
              key={title}
              style={{
                background: "rgba(255,255,255,0.025)",
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "20px",
              }}
            >
              <div
                style={{
                  color: "rgba(248,250,252,0.48)",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                {t.how.stepLabel} {String(index + 1).padStart(2, "0")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(21px, 4vw, 24px)",
                  lineHeight: 1.12,
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                {title}
              </h2>
              <p style={{ lineHeight: 1.7, margin: 0, color: "rgba(248,250,252,0.62)" }}>
                {text}
              </p>
            </article>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "start",
            padding: "26px",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 38px)",
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                marginBottom: "12px",
              }}
            >
              {t.how.whyTitle}
            </h2>
            <p style={{ color: "rgba(248,250,252,0.66)", lineHeight: 1.8, margin: 0 }}>
              {t.how.whyText}
            </p>
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {benefits.map((benefit) => (
              <div
                key={benefit}
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  padding: "12px 14px",
                  color: "rgba(248,250,252,0.78)",
                  lineHeight: 1.6,
                }}
              >
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "26px" }}>
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
            {t.how.create}
          </Link>
          <Link
            href="/test-replyo"
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
            {t.how.test}
          </Link>
        </div>
      </section>
    </main>
  );
}
