"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const testCopy = {
  en: {
    back: "Back to home",
    title: "Test Replyo",
    description:
      "See how Replyo turns a customer review into a professional business reply.",
    preview: "Google Customer Review",
    customer: "Marie Client",
    guide: "Local Guide • 12 reviews",
    placeholder: "Write or paste a customer review here...",
    empty: "Please enter a review first.",
    wrong: "Something went wrong.",
    failed: "Failed to generate reply.",
    generate: "Generate Reply",
    generating: "Generating...",
    replyTitle: "Your Business Reply",
    owner: "Business reply",
    ai: "Generated with AI",
    fallback: "Backup reply",
    error: "Error",
    writing: "Replyo is writing a professional response...",
    waiting: "Your AI-generated reply will appear here.",
  },
  fr: {
    back: "Retour a l'accueil",
    title: "Tester Replyo",
    description:
      "Voyez comment Replyo transforme un avis client en reponse professionnelle.",
    preview: "Avis client Google",
    customer: "Marie Cliente",
    guide: "Guide locale • 12 avis",
    placeholder: "Ecrivez ou collez un avis client ici...",
    empty: "Veuillez d'abord saisir un avis.",
    wrong: "Une erreur est survenue.",
    failed: "Impossible de generer la reponse.",
    generate: "Generer la reponse",
    generating: "Generation...",
    replyTitle: "Votre reponse d'etablissement",
    owner: "Reponse de l'etablissement",
    ai: "Genere avec l'IA",
    fallback: "Reponse de reserve",
    error: "Erreur",
    writing: "Replyo redige une reponse professionnelle...",
    waiting: "Votre reponse generee par l'IA apparaitra ici.",
  },
  es: {
    back: "Volver al inicio",
    title: "Probar Replyo",
    description:
      "Descubre como Replyo convierte una resena en una respuesta profesional.",
    preview: "Resena de cliente en Google",
    customer: "Maria Cliente",
    guide: "Guia local • 12 resenas",
    placeholder: "Escribe o pega aqui una resena del cliente...",
    empty: "Primero escribe una resena.",
    wrong: "Algo salio mal.",
    failed: "No se pudo generar la respuesta.",
    generate: "Generar respuesta",
    generating: "Generando...",
    replyTitle: "Tu respuesta del negocio",
    owner: "Respuesta del negocio",
    ai: "Generado con IA",
    fallback: "Respuesta de respaldo",
    error: "Error",
    writing: "Replyo esta redactando una respuesta profesional...",
    waiting: "Tu respuesta generada por IA aparecera aqui.",
  },
  ar: {
    back: "العودة الى الرئيسية",
    title: "جرّب Replyo",
    description:
      "شاهد كيف يحول Replyo تقييم العميل الى رد مهني من النشاط التجاري.",
    preview: "تقييم عميل على Google",
    customer: "ماري العميلة",
    guide: "مرشدة محلية • 12 تقييم",
    placeholder: "اكتب او الصق تقييم العميل هنا...",
    empty: "يرجى كتابة تقييم اولا.",
    wrong: "حدث خطأ ما.",
    failed: "تعذر إنشاء الرد.",
    generate: "إنشاء الرد",
    generating: "جارٍ الإنشاء...",
    replyTitle: "رد نشاطك التجاري",
    owner: "رد النشاط التجاري",
    ai: "تم إنشاؤه بالذكاء الاصطناعي",
    fallback: "رد بديل",
    error: "خطأ",
    writing: "يقوم Replyo بكتابة رد مهني...",
    waiting: "سيظهر الرد الذي أنشأه Replyo هنا.",
  },
  de: {
    back: "Zur Startseite",
    title: "Replyo testen",
    description:
      "Sehen Sie, wie Replyo eine Kundenbewertung in eine professionelle Antwort verwandelt.",
    preview: "Google-Kundenbewertung",
    customer: "Marie Kundin",
    guide: "Local Guide • 12 Bewertungen",
    placeholder: "Schreiben oder fugen Sie hier eine Kundenbewertung ein...",
    empty: "Bitte geben Sie zuerst eine Bewertung ein.",
    wrong: "Etwas ist schiefgelaufen.",
    failed: "Die Antwort konnte nicht erstellt werden.",
    generate: "Antwort erstellen",
    generating: "Wird erstellt...",
    replyTitle: "Ihre Unternehmensantwort",
    owner: "Unternehmensantwort",
    ai: "Mit KI erstellt",
    fallback: "Reserveantwort",
    error: "Fehler",
    writing: "Replyo schreibt eine professionelle Antwort...",
    waiting: "Ihre KI-generierte Antwort erscheint hier.",
  },
};

export default function TestReplyoPage() {
  const { language } = useLanguage();
  const copy = testCopy[language] || testCopy.en;
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateReply() {
    if (!review.trim()) {
      setReply(copy.empty);
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
        setReply(data.error || copy.wrong);
        setSource("error");
        return;
      }

      setReply(data.reply);
      setSource(data.source || "");
    } catch (error) {
      setReply(copy.failed);
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
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#444" }}>
            ← {copy.back}
          </Link>
        </div>

        <h1 style={{ fontSize: "38px", marginBottom: "10px", color: "#222" }}>
          {copy.title}
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>{copy.description}</p>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "22px", marginBottom: "18px" }}>{copy.preview}</h2>

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
                <div style={{ fontWeight: "bold", color: "#222" }}>{copy.customer}</div>
                <div style={{ fontSize: "14px", color: "#777" }}>{copy.guide}</div>
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
              placeholder={copy.placeholder}
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
                background: "transparent",
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
            {isLoading ? copy.generating : copy.generate}
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
          <h2 style={{ fontSize: "22px", marginBottom: "18px" }}>{copy.replyTitle}</h2>

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
              <div style={{ fontWeight: "bold" }}>{copy.owner}</div>
              {source === "openai" ? (
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#0f6c3b",
                    background: "#e8f7ee",
                    padding: "6px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {copy.ai}
                </div>
              ) : null}
            </div>
            <div style={{ color: reply ? "#333" : "#667085" }}>
              {isLoading ? copy.writing : reply || copy.waiting}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
