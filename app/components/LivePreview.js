"use client";
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
    customerName: "مريم خالد",
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
  const [isCompact, setIsCompact] = useState(false);
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

    const languageInterval = window.setInterval(() => {
      setActiveLanguageIndex((current) => (current + 1) % previewLanguages.length);
      setVisibleCharacters(0);
    }, 5200);

    return () => {
      window.clearInterval(typingInterval);
      window.clearInterval(languageInterval);
    };
  }, [activeLanguage.reply.length]);

  useEffect(() => {
    function updateViewportMode() {
      setIsCompact(window.innerWidth < 640);
    }

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  const typedReply = useMemo(
    () => activeLanguage.reply.slice(0, visibleCharacters),
    [activeLanguage.reply, visibleCharacters]
  );

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "28px",
        padding: "18px",
        background:
          "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(20,20,22,1) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          width: "100%",
          height: "2px",
          background:
            "linear-gradient(90deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)",
          opacity: 0.95,
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
            gridTemplateColumns: isCompact
              ? "minmax(0, 1fr)"
              : "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.035)",
              borderRadius: "22px",
              border: "1px solid rgba(66,133,244,0.18)",
              boxShadow: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 18px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#f8fafc" }}>
                    <span style={{ color: "#4285F4" }}>G</span>
                    <span style={{ color: "#EA4335" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#34A853" }}>l</span>
                    <span style={{ color: "#EA4335" }}>e</span>
                    <span style={{ color: "#f8fafc" }}> review</span>
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                      color: "rgba(248,250,252,0.68)",
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "1px" }}>★★★★★</span>
                    <span>{t.livePreview.reviewDetected}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, rgba(66,133,244,0.16) 0%, rgba(52,168,83,0.12) 100%)",
                    color: "#f3f4f6",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  Preview
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
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f8fafc",
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
                      color: "#f8fafc",
                      direction: activeLanguage.direction,
                      textAlign:
                        activeLanguage.direction === "rtl" ? "right" : "left",
                    }}
                  >
                    {activeLanguage.customerName}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "1px", fontSize: "13px", margin: "4px 0 6px" }}>
                    ★★★★★
                  </div>
                  <div
                    style={{
                      color: "rgba(248,250,252,0.72)",
                      fontSize: isCompact ? "13px" : "14px",
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
              background: "rgba(255,255,255,0.03)",
              borderRadius: "22px",
              border: "1px solid rgba(234,67,53,0.16)",
              boxShadow: "none",
              padding: isCompact ? "16px" : "18px",
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
              <div style={{ fontSize: "13px", color: "rgba(248,250,252,0.68)", fontWeight: "700" }}>
                Replyo reply
              </div>
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, rgba(66,133,244,0.16) 0%, rgba(251,188,5,0.12) 100%)",
                    color: "#dbe7ff",
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
                color: "#f8fafc",
                lineHeight: 1.8,
                minHeight: isCompact ? "120px" : "150px",
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
    </div>
  );
}
