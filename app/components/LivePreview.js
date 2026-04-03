"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const previewLanguages = [
  {
    id: "en",
    customerName: "Marie Dupont",
    review:
      "Amazing service, very friendly team, and the place felt so clean.",
    reply:
      "Thank you so much for your review. We are delighted you enjoyed your visit and felt welcomed by the team. We truly appreciate your support and look forward to seeing you again soon.",
    direction: "ltr",
  },
  {
    id: "ar",
    customerName: "مريم",
    review: "خدمة رائعة جدا، فريق ودود جدا، والمكان كان نظيفا للغاية.",
    reply:
      "شكرا جزيلا على تقييمك. سعدنا جدا لأنك استمتعت بزيارتك وشعرت بالترحيب من الفريق. نقدر دعمك ونتطلع لاستقبالك مرة أخرى قريبا.",
    direction: "rtl",
  },
  {
    id: "fr",
    customerName: "Marie Dupont",
    review:
      "Service incroyable, equipe tres accueillante, et l'endroit etait vraiment propre.",
    reply:
      "Merci beaucoup pour votre avis. Nous sommes ravis que vous ayez apprecie votre visite et l'accueil de notre equipe. Nous vous remercions pour votre confiance et esperons vous revoir tres bientot.",
    direction: "ltr",
  },
  {
    id: "de",
    customerName: "Marie Dupont",
    review:
      "Toller Service, sehr freundliches Team, und alles war wirklich sauber.",
    reply:
      "Vielen Dank fuer Ihre Bewertung. Wir freuen uns sehr, dass Ihnen Ihr Besuch gefallen hat und Sie sich vom Team gut aufgenommen gefuehlt haben. Wir schaetzen Ihre Unterstuetzung und freuen uns darauf, Sie bald wiederzusehen.",
    direction: "ltr",
  },
  {
    id: "zh",
    customerName: "Marie Dupont",
    review: "服务非常棒，团队很友好，而且这里感觉非常干净。",
    reply:
      "非常感谢您的评价。我们很高兴您喜欢这次体验，也感受到了团队的热情接待。感谢您的支持，期待很快再次欢迎您。",
    direction: "ltr",
  },
];

export default function LivePreview() {
  const { t } = useLanguage();
  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [pulseStep, setPulseStep] = useState(0);
  const activeLanguage = previewLanguages[activeLanguageIndex];

  useEffect(() => {
    const typingInterval = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= activeLanguage.reply.length) {
          return 0;
        }

        return current + 3;
      });
    }, 60);

    const pulseInterval = window.setInterval(() => {
      setPulseStep((current) => (current + 1) % 3);
    }, 700);

    const languageInterval = window.setInterval(() => {
      setActiveLanguageIndex((current) => (current + 1) % previewLanguages.length);
      setVisibleCharacters(0);
    }, 5200);

    return () => {
      window.clearInterval(typingInterval);
      window.clearInterval(pulseInterval);
      window.clearInterval(languageInterval);
    };
  }, [activeLanguage.reply.length]);

  const typedReply = useMemo(
    () => activeLanguage.reply.slice(0, visibleCharacters),
    [activeLanguage.reply, visibleCharacters]
  );

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "30px",
        padding: "24px",
        background: "rgba(255,255,255,0.84)",
        border: "1px solid rgba(23,32,51,0.08)",
        boxShadow: "0 24px 60px rgba(40,55,90,0.14)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-60px",
          width: "240px",
          height: "240px",
          background:
            "radial-gradient(circle, rgba(66,133,244,0.16) 0%, rgba(66,133,244,0) 72%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(220px, 0.9fr)",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid #e2e8f3",
              boxShadow: "0 16px 30px rgba(23,32,51,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 18px 16px",
                borderBottom: "1px solid #eef2f7",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#172033" }}>
                    {t.livePreview.reviewTitle}
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                      color: "#667085",
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ color: "#f4b400", letterSpacing: "1px" }}>★★★★★</span>
                    <span>{t.livePreview.reviewDetected}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background: "#f5f8ff",
                    color: "#2f64c6",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {t.livePreview.livePreview}
                </div>
              </div>
            </div>

            <div style={{ padding: "18px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#fce7df",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9f3a21",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  M
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#172033",
                      direction: activeLanguage.direction,
                      textAlign:
                        activeLanguage.direction === "rtl" ? "right" : "left",
                    }}
                  >
                    {activeLanguage.customerName}
                  </div>
                  <div style={{ color: "#f4b400", letterSpacing: "1px", fontSize: "13px", margin: "4px 0 6px" }}>
                    ★★★★★
                  </div>
                  <div
                    style={{
                      color: "#667085",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      direction: activeLanguage.direction,
                      textAlign:
                        activeLanguage.direction === "rtl" ? "right" : "left",
                    }}
                  >
                    {activeLanguage.review}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: "#172033",
                color: "#fff",
                padding: "18px",
                borderRadius: "22px",
                boxShadow: "0 16px 30px rgba(23,32,51,0.16)",
              }}
            >
              <div style={{ fontSize: "12px", opacity: 0.72, marginBottom: "8px" }}>
                {t.livePreview.status}
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
                {t.livePreview.drafting}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="replyo-pulse-dot"
                    style={{
                      background: pulseStep === index ? "#7db0ff" : "rgba(125,176,255,0.28)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#fffdf6",
                borderRadius: "22px",
                border: "1px solid #f1e1a7",
                boxShadow: "0 16px 30px rgba(23,32,51,0.08)",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#667085", fontWeight: "700" }}>
                  {t.livePreview.draft}
                </div>
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: "999px",
                    background: "rgba(66,133,244,0.1)",
                    color: "#2f64c6",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {t.livePreview.reviewFirst}
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#172033",
                  lineHeight: 1.85,
                  minHeight: "150px",
                  direction: activeLanguage.direction,
                  textAlign:
                    activeLanguage.direction === "rtl" ? "right" : "left",
                }}
              >
                {typedReply}
                <span className="replyo-cursor" />
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#5b6474", fontSize: "14px" }}>
            {t.livePreview.helper}
          </div>

          <Link
            href="/test-replyo"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#172033",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px 16px",
              fontWeight: "600",
            }}
          >
            {t.livePreview.test}
          </Link>
        </div>
      </div>
    </div>
  );
}
