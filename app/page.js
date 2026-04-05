"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LivePreview from "./components/LivePreview";
import { useLanguage } from "./components/LanguageProvider";

export default function Home() {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [featuresLifted, setFeaturesLifted] = useState(false);

  const featureCards = [
    {
      title: t.home.saveTitle,
      text: t.home.saveText,
      icon: "✓",
      accent: "#23a26d",
      background: "linear-gradient(180deg, rgba(255,248,224,0.96) 0%, rgba(255,255,255,0.84) 100%)",
      featured: true,
    },
    {
      title: t.home.proTitle,
      text: t.home.proText,
      icon: "✓",
      accent: "#23a26d",
      background: "rgba(255,255,255,0.78)",
      featured: false,
    },
    {
      title: t.home.missTitle,
      text: t.home.missText,
      icon: "✓",
      accent: "#23a26d",
      background: "rgba(255,255,255,0.78)",
      featured: false,
    },
    {
      title: t.home.easyTitle,
      text: t.home.easyText,
      icon: "✓",
      accent: "#23a26d",
      background: "rgba(255,255,255,0.78)",
      featured: false,
    },
    {
      title: t.home.languageTitle,
      text: t.home.languageText,
      icon: "✓",
      accent: "#23a26d",
      background: "rgba(255,255,255,0.78)",
      featured: false,
    },
    {
      title: t.home.approvalTitle,
      text: t.home.approvalText,
      icon: "✓",
      accent: "#23a26d",
      background: "rgba(255,255,255,0.78)",
      featured: false,
    },
  ];

  useEffect(() => {
    function updateViewport() {
      setIsMobile(window.innerWidth < 768);
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFeaturesLifted((current) => !current);
    }, 1300);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const ctaButtons = (
    <div
      style={{
        display: "flex",
        gap: "14px",
        flexWrap: "wrap",
        marginBottom: isMobile ? 0 : "26px",
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
          width: isMobile ? "100%" : "auto",
          textAlign: "center",
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
          width: isMobile ? "100%" : "auto",
          textAlign: "center",
        }}
      >
        {t.home.create}
      </Link>
    </div>
  );

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
          padding: "clamp(20px, 6vw, 72px) clamp(18px, 5vw, 30px) clamp(48px, 10vw, 92px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(22px, 5vw, 36px)",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(36px, 9vw, 56px)",
              lineHeight: 1.05,
              marginBottom: "20px",
              maxWidth: "620px",
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            <span
              style={{
                display: "inline",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 62%, rgba(255,225,132,0.55) 62%, rgba(255,225,132,0.55) 100%)",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                padding: "0 0.08em",
              }}
            >
              {t.home.title}
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 4.4vw, 19px)",
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
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: "12px",
              maxWidth: "760px",
            }}
          >
            {featureCards.map(({ title, text, icon, accent, background, featured }, index) => (
              <div
                key={title}
                style={{
                  background,
                  borderRadius: "18px",
                  padding: "16px",
                  border: featured
                    ? "1px solid rgba(244,180,0,0.28)"
                    : "1px solid rgba(23,32,51,0.08)",
                  minHeight: "124px",
                  boxShadow:
                    featuresLifted
                      ? "0 18px 34px rgba(23,32,51,0.14)"
                      : featured
                        ? "0 16px 30px rgba(244,180,0,0.12)"
                        : "0 10px 24px rgba(23,32,51,0.06)",
                  transform:
                    featuresLifted
                      ? "translateY(-6px) scale(1.035)"
                      : featured
                        ? "translateY(-2px)"
                        : "translateY(0)",
                  filter: featuresLifted ? "saturate(1.06)" : "saturate(1)",
                  transition:
                    "transform 520ms ease, box-shadow 520ms ease, filter 520ms ease, background 520ms ease",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    marginBottom: "10px",
                    background: `${accent}18`,
                    color: accent,
                    fontSize: "15px",
                    fontWeight: "700",
                    transform: featuresLifted ? "scale(1.14)" : "scale(1)",
                    background:
                      featuresLifted ? `${accent}2e` : `${accent}18`,
                    transition: "transform 520ms ease, background 520ms ease",
                  }}
                >
                  {icon}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: "#172033",
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

          <div style={{ marginTop: "24px" }}>{ctaButtons}</div>
        </div>

        <div>
          <LivePreview />
        </div>
      </section>

    </main>
  );
}
