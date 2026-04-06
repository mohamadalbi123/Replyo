"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../components/LanguageProvider";

const contactCopy = {
  en: {
    back: "Back to home",
    badge: "Contact Replyo",
    title: "Tell us what you need.",
    description:
      "Questions about Replyo, pricing, onboarding, or Google Business connection? Send a message and we will get back to you.",
    name: "Your name",
    email: "Email address",
    business: "Business name",
    message: "Message",
    placeholderBusiness: "Optional",
    placeholderMessage:
      "Tell us what you want help with, what type of business you run, or what you would like Replyo to do for you.",
    submit: "Send message",
    sending: "Sending...",
    success: "Your message has been sent.",
    sideTitle: "Best for",
    sideItems: [
      "Questions before subscribing",
      "Early access and demos",
      "Feedback about Replyo",
      "Google Business connection help",
    ],
    direct: "Or email us directly",
  },
  fr: {
    back: "Retour a l'accueil",
    badge: "Contacter Replyo",
    title: "Dites-nous ce dont vous avez besoin.",
    description:
      "Questions sur Replyo, les tarifs, l'onboarding ou la connexion Google Business ? Envoyez-nous un message.",
    name: "Votre nom",
    email: "Adresse email",
    business: "Nom de l'etablissement",
    message: "Message",
    placeholderBusiness: "Optionnel",
    placeholderMessage:
      "Expliquez-nous votre besoin, votre activite ou ce que vous aimeriez que Replyo fasse pour vous.",
    submit: "Envoyer le message",
    sending: "Envoi...",
    success: "Votre message a bien ete envoye.",
    sideTitle: "Ideal pour",
    sideItems: [
      "Questions avant abonnement",
      "Acces anticipe et demos",
      "Retours sur Replyo",
      "Aide sur la connexion Google Business",
    ],
    direct: "Ou ecrivez-nous directement",
  },
  es: {
    back: "Volver al inicio",
    badge: "Contactar Replyo",
    title: "Cuentanos lo que necesitas.",
    description:
      "Preguntas sobre Replyo, precios, onboarding o la conexion con Google Business? Enviamos un mensaje y te responderemos.",
    name: "Tu nombre",
    email: "Correo electronico",
    business: "Nombre del negocio",
    message: "Mensaje",
    placeholderBusiness: "Opcional",
    placeholderMessage:
      "Cuéntanos en que necesitas ayuda, que tipo de negocio tienes o que te gustaria que Replyo hiciera por ti.",
    submit: "Enviar mensaje",
    sending: "Enviando...",
    success: "Tu mensaje ha sido enviado.",
    sideTitle: "Ideal para",
    sideItems: [
      "Preguntas antes de suscribirte",
      "Acceso temprano y demos",
      "Comentarios sobre Replyo",
      "Ayuda con Google Business",
    ],
    direct: "O escribenos directamente",
  },
  ar: {
    back: "العودة الى الرئيسية",
    badge: "تواصل مع Replyo",
    title: "اخبرنا بما تحتاجه.",
    description:
      "اذا كانت لديك اسئلة حول Replyo او الاسعار او الربط مع Google Business، ارسل لنا رسالة وسنرد عليك.",
    name: "الاسم",
    email: "البريد الالكتروني",
    business: "اسم النشاط التجاري",
    message: "الرسالة",
    placeholderBusiness: "اختياري",
    placeholderMessage:
      "اخبرنا بما تحتاجه، ونوع نشاطك، او ما الذي تريد من Replyo مساعدتك فيه.",
    submit: "ارسال الرسالة",
    sending: "جارٍ الارسال...",
    success: "تم ارسال رسالتك.",
    sideTitle: "مناسب من اجل",
    sideItems: [
      "الاسئلة قبل الاشتراك",
      "الوصول المبكر والعروض التجريبية",
      "ملاحظات حول Replyo",
      "المساعدة في Google Business",
    ],
    direct: "او راسلنا مباشرة",
  },
  de: {
    back: "Zur Startseite",
    badge: "Replyo kontaktieren",
    title: "Sagen Sie uns, was Sie brauchen.",
    description:
      "Fragen zu Replyo, Preisen, Onboarding oder der Google-Business-Verbindung? Schreiben Sie uns.",
    name: "Ihr Name",
    email: "E-Mail-Adresse",
    business: "Name des Unternehmens",
    message: "Nachricht",
    placeholderBusiness: "Optional",
    placeholderMessage:
      "Schreiben Sie, wobei Sie Hilfe brauchen, welche Art Unternehmen Sie fuehren oder was Replyo fuer Sie erledigen soll.",
    submit: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Ihre Nachricht wurde gesendet.",
    sideTitle: "Ideal fuer",
    sideItems: [
      "Fragen vor dem Abo",
      "Frueher Zugang und Demos",
      "Feedback zu Replyo",
      "Hilfe bei Google Business",
    ],
    direct: "Oder direkt per E-Mail",
  },
};

const inputStyle = {
  width: "100%",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "14px 16px",
  fontSize: "15px",
  fontFamily: "Arial, sans-serif",
  outline: "none",
  background: "rgba(255,255,255,0.03)",
  color: "#ffffff",
};

export default function ContactPage() {
  const { language } = useLanguage();
  const copy = contactCopy[language] || contactCopy.en;
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: data.error || "Something went wrong.",
        });
        return;
      }

      setForm({
        name: "",
        email: "",
        businessName: "",
        message: "",
      });
      setFeedback({
        type: "success",
        message: data.message || copy.success,
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07090d",
        padding: "40px 20px 90px",
        fontFamily: "Arial, sans-serif",
        color: "#f8fafc",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "rgba(248,250,252,0.62)", textDecoration: "none" }}>
            ← {copy.back}
          </Link>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              borderRadius: "28px",
              padding: "30px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(248,250,252,0.62)",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {copy.badge}
            </div>
            <h1 style={{ fontSize: "clamp(38px, 7vw, 62px)", lineHeight: 0.96, letterSpacing: "-0.07em", marginBottom: "14px", color: "#ffffff" }}>
              {copy.title}
            </h1>
            <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.7, marginBottom: "26px", maxWidth: "38ch" }}>
              {copy.description}
            </p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder={copy.name}
                style={inputStyle}
              />
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder={copy.email}
                style={inputStyle}
              />
              <input
                value={form.businessName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    businessName: event.target.value,
                  }))
                }
                placeholder={`${copy.business} (${copy.placeholderBusiness})`}
                style={inputStyle}
              />
              <textarea
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                placeholder={copy.placeholderMessage}
                style={{
                  ...inputStyle,
                  minHeight: "170px",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />

              {feedback.message ? (
                <div
                  style={{
                    borderRadius: "14px",
                    padding: "13px 14px",
                    background:
                      feedback.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    color: feedback.type === "success" ? "#9ce9c2" : "#ffb4b4",
                    fontSize: "14px",
                  }}
                >
                  {feedback.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  border: "none",
                  cursor: isSubmitting ? "wait" : "pointer",
                  background: "#ffffff",
                  color: "#07090d",
                  padding: "15px 20px",
                  borderRadius: "16px",
                  fontWeight: "700",
                  fontSize: "15px",
                  opacity: isSubmitting ? 0.75 : 1,
                }}
              >
                {isSubmitting ? copy.sending : copy.submit}
              </button>
            </form>
          </div>

          <aside
            style={{
              background: "rgba(255,255,255,0.025)",
              color: "#f8fafc",
              borderRadius: "28px",
              padding: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2 style={{ fontSize: "28px", lineHeight: 1.1, marginBottom: "18px" }}>
              {copy.sideTitle}
            </h2>
            <div style={{ display: "grid", gap: "12px", marginBottom: "28px" }}>
              {copy.sideItems.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "14px 16px",
                    lineHeight: 1.6,
                    color: "rgba(248,250,252,0.76)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.12)",
                paddingTop: "18px",
              }}
            >
              <div style={{ fontSize: "14px", color: "rgba(248,250,252,0.62)", marginBottom: "10px" }}>
                {copy.direct}
              </div>
              <a
                href="mailto:hello@replyo.online"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                hello@replyo.online
              </a>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
