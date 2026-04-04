"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageProvider";
import {
  BILLING_STORAGE_KEY,
  defaultBilling,
  writeStoredValue,
} from "../lib/demoState";

const pricingCopy = {
  en: {
    back: "Back to home",
    badge: "Simple pricing",
    title: "One offer. Two ways to pay.",
    description:
      "Replyo keeps pricing simple for small local businesses. Start with one location and choose the billing rhythm that suits you best.",
    monthly: "Monthly",
    yearly: "Yearly Saver",
    monthlyDesc:
      "A flexible monthly plan for one business location.",
    yearlyDesc:
      "The same plan with a better yearly rate if you already know you want Replyo long term.",
    perMonth: "/ month",
    perYear: "/ year",
    savings: "Save $39 per year",
    ctaMonthly: "Start monthly",
    ctaYearly: "Choose yearly",
    featured: "Best value",
    features: [
      "1 connected Google Business location",
      "AI reply drafts and auto-reply mode",
      "Approval mode before posting",
      "Review inbox and reply history",
      "Multi-language replies",
    ],
  },
  fr: {
    back: "Retour a l'accueil",
    badge: "Tarification simple",
    title: "Une offre. Deux facons de payer.",
    description:
      "Replyo garde une tarification simple pour les petits commerces locaux. Commencez avec un etablissement et choisissez le rythme de facturation qui vous convient.",
    monthly: "Mensuel",
    yearly: "Annuel avantageux",
    monthlyDesc:
      "Une formule mensuelle flexible pour un seul etablissement.",
    yearlyDesc:
      "La meme formule avec un meilleur tarif annuel si vous savez deja que vous voulez Replyo sur la duree.",
    perMonth: "/ mois",
    perYear: "/ an",
    savings: "Economisez 39 $ par an",
    ctaMonthly: "Commencer en mensuel",
    ctaYearly: "Choisir l'annuel",
    featured: "Meilleure valeur",
    features: [
      "1 fiche Google Business connectee",
      "Brouillons IA et mode auto-reponse",
      "Validation avant publication",
      "Boite de reception et historique des reponses",
      "Reponses multilingues",
    ],
  },
  es: {
    back: "Volver al inicio",
    badge: "Precios simples",
    title: "Una oferta. Dos formas de pago.",
    description:
      "Replyo mantiene el precio simple para pequenos negocios locales. Empieza con una ubicacion y elige la facturacion que mejor te encaje.",
    monthly: "Mensual",
    yearly: "Ahorro anual",
    monthlyDesc:
      "Un plan mensual flexible para una sola ubicacion.",
    yearlyDesc:
      "El mismo plan con mejor precio anual si ya sabes que quieres usar Replyo a largo plazo.",
    perMonth: "/ mes",
    perYear: "/ ano",
    savings: "Ahorra 39 $ al ano",
    ctaMonthly: "Empezar mensual",
    ctaYearly: "Elegir anual",
    featured: "Mejor valor",
    features: [
      "1 ubicacion de Google Business conectada",
      "Borradores IA y modo auto-respuesta",
      "Modo aprobacion antes de publicar",
      "Bandeja de resenas e historial",
      "Respuestas en varios idiomas",
    ],
  },
  ar: {
    back: "العودة الى الرئيسية",
    badge: "اسعار بسيطة",
    title: "خطة واحدة. طريقتان للدفع.",
    description:
      "يبقي Replyo التسعير بسيطا للاعمال المحلية الصغيرة. ابدأ بموقع واحد واختر طريقة الدفع المناسبة لك.",
    monthly: "شهري",
    yearly: "توفير سنوي",
    monthlyDesc:
      "خطة شهرية مرنة لموقع تجاري واحد.",
    yearlyDesc:
      "نفس الخطة مع سعر سنوي افضل اذا كنت تعرف انك تريد Replyo على المدى الطويل.",
    perMonth: "/ شهر",
    perYear: "/ سنة",
    savings: "وفر 39 دولارا سنويا",
    ctaMonthly: "ابدأ شهريا",
    ctaYearly: "اختر السنوي",
    featured: "افضل قيمة",
    features: [
      "موقع Google Business واحد متصل",
      "مسودات ذكاء اصطناعي ووضع الرد التلقائي",
      "وضع الموافقة قبل النشر",
      "صندوق وارد للتقييمات وسجل الردود",
      "ردود بلغات متعددة",
    ],
  },
  de: {
    back: "Zur Startseite",
    badge: "Einfache Preise",
    title: "Ein Angebot. Zwei Zahlungsarten.",
    description:
      "Replyo haelt die Preise fuer kleine lokale Unternehmen bewusst einfach. Starte mit einem Standort und waehle die passende Abrechnung.",
    monthly: "Monatlich",
    yearly: "Jahresvorteil",
    monthlyDesc:
      "Ein flexibler Monatsplan fuer einen Standort.",
    yearlyDesc:
      "Der gleiche Plan mit besserem Jahrespreis, wenn du Replyo laenger nutzen willst.",
    perMonth: "/ Monat",
    perYear: "/ Jahr",
    savings: "Spare 39 $ pro Jahr",
    ctaMonthly: "Monatlich starten",
    ctaYearly: "Jaehrlich waehlen",
    featured: "Bester Wert",
    features: [
      "1 verbundener Google-Business-Standort",
      "KI-Antwortentwuerfe und Auto-Modus",
      "Freigabe vor dem Posten",
      "Bewertungs-Postfach und Verlauf",
      "Antworten in mehreren Sprachen",
    ],
  },
};

export default function PricingPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const copy = pricingCopy[language] || pricingCopy.en;

  const plans = [
    {
      id: "single-monthly",
      name: copy.monthly,
      price: "$17",
      cadence: copy.perMonth,
      description: copy.monthlyDesc,
      cta: copy.ctaMonthly,
      highlight: false,
    },
    {
      id: "single-yearly",
      name: copy.yearly,
      price: "$165",
      cadence: copy.perYear,
      description: copy.yearlyDesc,
      cta: copy.ctaYearly,
      highlight: true,
    },
  ];

  function handleSelectPlan(plan) {
    const nextBillingDate =
      plan.id === "single-yearly" ? "April 3, 2027" : "May 3, 2026";

    writeStoredValue(BILLING_STORAGE_KEY, {
      ...defaultBilling,
      status: "active",
      planId: plan.id,
      planName: "Single Location",
      amountLabel: `${plan.price} ${plan.cadence}`.trim(),
      cadence: plan.name,
      nextBillingDate,
      selectedAt: new Date().toISOString(),
      locationLimit: 1,
    });

    router.push("/signup");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 42%, #edf3ff 100%)",
        padding: "56px 20px 90px",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1020px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← {copy.back}
          </Link>
        </div>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "30px",
            padding: "38px 34px",
            boxShadow: "0 22px 55px rgba(23,32,51,0.18)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "8px 12px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {copy.badge}
          </div>
          <h1 style={{ fontSize: "48px", lineHeight: 1.05, marginBottom: "14px" }}>
            {copy.title}
          </h1>
          <p
            style={{
              maxWidth: "760px",
              color: "rgba(255,248,236,0.82)",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {copy.description}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "22px",
          }}
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              style={{
                background: plan.highlight ? "#fff8e6" : "#ffffff",
                borderRadius: "26px",
                padding: "28px",
                border: plan.highlight
                  ? "1px solid #f2d37b"
                  : "1px solid rgba(23,32,51,0.08)",
                boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
              }}
            >
              {plan.highlight ? (
                <div
                  style={{
                    display: "inline-block",
                    background: "#172033",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "7px 11px",
                    fontSize: "12px",
                    marginBottom: "14px",
                  }}
                >
                  {copy.featured}
                </div>
              ) : null}

              <h2 style={{ fontSize: "28px", color: "#172033", marginBottom: "8px" }}>
                {plan.name}
              </h2>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "800",
                  color: "#172033",
                  marginBottom: "10px",
                  letterSpacing: "-0.05em",
                }}
              >
                {plan.price}
                <span
                  style={{
                    fontSize: "16px",
                    color: "#6b7280",
                    fontWeight: "500",
                    letterSpacing: 0,
                  }}
                >
                  {" "}
                  {plan.cadence}
                </span>
              </div>
              <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
                {plan.description}
              </p>

              {plan.highlight ? (
                <div
                  style={{
                    display: "inline-block",
                    marginBottom: "18px",
                    background: "rgba(215,169,75,0.16)",
                    color: "#8d6413",
                    borderRadius: "999px",
                    padding: "8px 10px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {copy.savings}
                </div>
              ) : (
                <div style={{ marginBottom: "18px" }} />
              )}

              <div style={{ display: "grid", gap: "10px", marginBottom: "24px" }}>
                {copy.features.map((feature) => (
                  <div key={feature} style={{ color: "#273244", lineHeight: 1.6 }}>
                    {`• ${feature}`}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan(plan)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  background: plan.highlight ? "#172033" : "#eff3fb",
                  color: plan.highlight ? "#fff" : "#172033",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
