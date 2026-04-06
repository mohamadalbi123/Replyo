"use client";

import Link from "next/link";
import LivePreview from "./components/LivePreview";
import { useLanguage } from "./components/LanguageProvider";

const darkHomeCopy = {
  en: {
    eyebrow: "Google review workflow",
    subline: "Replyo handles Google reviews without the busywork.",
    note: "",
    sectionTitle: "One focused system",
    sectionText:
      "Replyo is built for one clear job: help businesses reply faster, stay consistent, and never leave reviews unanswered.",
    points: [
      "Google reviews handled without daily admin work",
      "Choose approval mode or let replies post automatically",
      "Reply in the same language your customer used",
    ],
  },
  fr: {
    eyebrow: "Workflow des avis Google",
    subline: "Replyo gere les avis Google sans charge manuelle inutile.",
    note: "",
    sectionTitle: "Un systeme clair",
    sectionText:
      "Replyo est construit pour une mission simple: aider les entreprises a repondre plus vite, rester coherentes et ne laisser aucun avis sans reponse.",
    points: [
      "Avis Google pris en charge sans travail administratif quotidien",
      "Choisissez la validation manuelle ou la publication automatique",
      "Repondez dans la meme langue que votre client",
    ],
  },
  es: {
    eyebrow: "Flujo de resenas de Google",
    subline: "Replyo gestiona resenas de Google sin trabajo manual innecesario.",
    note: "",
    sectionTitle: "Un sistema claro",
    sectionText:
      "Replyo esta hecho para una tarea clara: ayudar a los negocios a responder mas rapido, mantener coherencia y no dejar resenas sin contestar.",
    points: [
      "Resenas de Google gestionadas sin trabajo administrativo diario",
      "Elige aprobacion manual o publicacion automatica",
      "Responde en el mismo idioma que usa tu cliente",
    ],
  },
  de: {
    eyebrow: "Google-Bewertungs-Workflow",
    subline: "Replyo bearbeitet Google-Bewertungen ohne unnoetigen manuellen Aufwand.",
    note: "",
    sectionTitle: "Ein fokussiertes System",
    sectionText:
      "Replyo hat eine klare Aufgabe: Unternehmen helfen, schneller zu antworten, konsistent zu bleiben und keine Bewertung unbeantwortet zu lassen.",
    points: [
      "Google-Bewertungen ohne taeglichen Verwaltungsaufwand bearbeiten",
      "Zwischen Freigabe und automatischem Posten waehlen",
      "In derselben Sprache antworten wie der Kunde",
    ],
  },
  ar: {
    eyebrow: "سير عمل تقييمات Google",
    subline: "يتولى Replyo تقييمات Google بدون العمل اليدوي المرهق.",
    note: "",
    sectionTitle: "نظام واضح ومركز",
    sectionText:
      "تم تصميم Replyo لمهمة واحدة واضحة: مساعدة الشركات على الرد بسرعة، والحفاظ على الاتساق، وعدم ترك أي تقييم بدون رد.",
    points: [
      "إدارة تقييمات Google بدون عمل إداري يومي",
      "اختر بين المراجعة اليدوية أو النشر التلقائي",
      "الرد بنفس اللغة التي كتب بها العميل",
    ],
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const copy = darkHomeCopy[language] || darkHomeCopy.en;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07090d",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "clamp(32px, 6vw, 92px) clamp(18px, 5vw, 34px) 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(30px, 6vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(248,250,252,0.7)",
                fontSize: "13px",
                fontWeight: "700",
                marginBottom: "22px",
              }}
            >
              {copy.eyebrow}
            </div>

            <h1
              style={{
                fontSize: "clamp(48px, 8vw, 92px)",
                lineHeight: 0.9,
                letterSpacing: "-0.08em",
                margin: "0 0 20px",
                maxWidth: "760px",
                color: "#ffffff",
                textWrap: "balance",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>Replyo handles</span>
              <br />
              every Google review for your business.
            </h1>

            <p
              style={{
                margin: "0 0 12px",
                maxWidth: "560px",
                fontSize: "clamp(18px, 3vw, 20px)",
                lineHeight: 1.72,
                color: "rgba(248,250,252,0.72)",
              }}
            >
              {copy.subline}
            </p>

            <div style={{ height: "10px" }} />

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "24px",
              }}
            >
              <Link
                href="/test-replyo"
                style={{
                  textDecoration: "none",
                  background: "#ffffff",
                  color: "#07090d",
                  padding: "15px 24px",
                  borderRadius: "15px",
                  fontWeight: "700",
                }}
              >
                {t.home.try}
              </Link>
              <Link
                href="/signup"
                style={{
                  textDecoration: "none",
                  background: "transparent",
                  color: "#ffffff",
                  padding: "15px 24px",
                  borderRadius: "15px",
                  fontWeight: "700",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {t.home.create}
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
                maxWidth: "520px",
              }}
            >
              {copy.points.map((point) => (
                <div
                  key={point}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(248,250,252,0.78)",
                    fontSize: "15px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "999px",
                      background: "#ffffff",
                      flexShrink: 0,
                    }}
                  />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#0d1117",
              borderRadius: "32px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "16px",
              boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
            }}
          >
            <LivePreview />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 clamp(18px, 5vw, 34px) 88px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: copy.note ? "minmax(0, 1fr) minmax(220px, 0.72fr)" : "minmax(0, 1fr)",
            gap: "22px",
            alignItems: "start",
            paddingTop: "26px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "clamp(30px, 5vw, 42px)",
                fontWeight: "700",
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
                marginBottom: "12px",
              }}
            >
              {copy.sectionTitle}
            </div>
            <div
              style={{
                color: "rgba(248,250,252,0.64)",
                lineHeight: 1.82,
                maxWidth: "760px",
              }}
            >
              {copy.sectionText}
            </div>
          </div>

          {copy.note ? (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "16px",
                color: "rgba(248,250,252,0.72)",
                lineHeight: 1.7,
              }}
            >
              {copy.note}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
