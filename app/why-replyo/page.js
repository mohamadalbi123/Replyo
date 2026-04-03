"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function WhyReplyoPage() {
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
          padding: "72px 28px 96px",
        }}
      >
        <div style={{ maxWidth: "760px", marginBottom: "32px" }}>
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
            {t.why.badge}
          </div>

          <h1
            style={{
              fontSize: "54px",
              lineHeight: 1.02,
              marginBottom: "18px",
            }}
          >
            {t.why.title}
          </h1>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.75,
              color: "#556070",
              margin: 0,
              maxWidth: "700px",
            }}
          >
            {t.why.description}
          </p>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(300px, 0.95fr)",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#172033",
              color: "#fff8ec",
              borderRadius: "30px",
              padding: "28px",
              boxShadow: "0 24px 50px rgba(23,32,51,0.18)",
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
              {t.why.coreBadge}
            </div>
            <h2 style={{ fontSize: "34px", lineHeight: 1.1, marginBottom: "14px" }}>
              {t.why.coreTitle}
            </h2>
            <p
              style={{
                color: "rgba(255,248,236,0.82)",
                lineHeight: 1.75,
                marginBottom: "18px",
              }}
            >
              {t.why.coreText}
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              {t.why.extra.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "18px",
                    padding: "14px 16px",
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
              background: "rgba(255,255,255,0.82)",
              borderRadius: "30px",
              padding: "24px",
              border: "1px solid rgba(23,32,51,0.08)",
              boxShadow: "0 22px 50px rgba(48,63,90,0.1)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#eff3fb",
                color: "#31598e",
                fontSize: "13px",
                fontWeight: "700",
                marginBottom: "14px",
              }}
            >
              {t.why.customerBadge}
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {t.why.customerItems.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "#fff",
                    borderRadius: "18px",
                    border: "1px solid #e4e9f2",
                    padding: "16px",
                    color: "#344054",
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
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(23,32,51,0.08)",
            borderRadius: "30px",
            padding: "24px",
            boxShadow: "0 22px 50px rgba(48,63,90,0.1)",
            marginBottom: "24px",
            perspective: "1400px",
          }}
        >
          <div style={{ maxWidth: "680px", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "38px", lineHeight: 1.1, marginBottom: "12px" }}>
              {t.why.reasonsTitle}
            </h2>
            <p style={{ color: "#5b6474", lineHeight: 1.75, margin: 0 }}>{t.why.reasonsText}</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {t.why.reasons.map(([title, text], index) => (
              <article
                key={title}
                className="replyo-why-card"
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  border: "1px solid #e4e9f2",
                  padding: "20px",
                  boxShadow: "0 14px 30px rgba(82,95,127,0.08)",
                  animationDelay: `${index * 140}ms`,
                }}
              >
                <h3
                  className="replyo-why-card-title"
                  style={{ fontSize: "22px", lineHeight: 1.25, marginBottom: "10px" }}
                >
                  {title}
                </h3>
                <p style={{ color: "#5b6474", lineHeight: 1.75, margin: 0 }}>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "rgba(255,255,255,0.84)",
            border: "1px solid rgba(23,32,51,0.08)",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 22px 50px rgba(48,63,90,0.1)",
            display: "flex",
            justifyContent: "space-between",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "660px" }}>
            <h2 style={{ fontSize: "34px", lineHeight: 1.1, marginBottom: "10px" }}>
              {t.why.ctaTitle}
            </h2>
            <p style={{ color: "#5b6474", lineHeight: 1.75, margin: 0 }}>{t.why.ctaText}</p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/how-it-works"
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
              {t.why.how}
            </Link>
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
              {t.why.create}
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
