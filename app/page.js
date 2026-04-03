"use client";

import Link from "next/link";
import LivePreview from "./components/LivePreview";
import { useLanguage } from "./components/LanguageProvider";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#162033",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "72px 30px 92px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "36px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              display: "inline-block",
              background: "#fff0c2",
              color: "#7a5600",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              marginBottom: "22px",
              fontWeight: "600",
            }}
          >
            {t.home.badge}
          </p>

          <h1
            style={{
              fontSize: "56px",
              lineHeight: 1.02,
              marginBottom: "20px",
              maxWidth: "620px",
            }}
          >
            {t.home.title}
          </h1>

          <p
            style={{
              fontSize: "19px",
              color: "#4a5568",
              marginBottom: "30px",
              maxWidth: "580px",
              lineHeight: 1.7,
            }}
          >
            {t.home.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "26px",
            }}
          >
            <Link
              href="/test-replyo"
              style={{
                background: "#172033",
                color: "#fff",
                padding: "15px 24px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: "600",
                boxShadow: "0 16px 30px rgba(23,32,51,0.18)",
              }}
            >
              {t.home.try}
            </Link>

            <Link
              href="/signup"
              style={{
                background: "rgba(255,255,255,0.72)",
                color: "#172033",
                padding: "15px 24px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: "600",
                border: "1px solid rgba(23,32,51,0.12)",
              }}
            >
              {t.home.create}
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              maxWidth: "640px",
            }}
          >
            {[
              [t.home.saveTitle, t.home.saveText],
              [t.home.proTitle, t.home.proText],
              [t.home.missTitle, t.home.missText],
            ].map(([title, text]) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.74)",
                  borderRadius: "18px",
                  padding: "16px",
                  border: "1px solid rgba(23,32,51,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#586174",
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <LivePreview />
      </section>
    </main>
  );
}
