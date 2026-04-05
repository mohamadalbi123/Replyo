"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../components/LanguageProvider";
import {
  BILLING_STORAGE_KEY,
  defaultBilling,
  writeStoredValue,
} from "../lib/demoState";

const pricingCopy = {
  en: {
    back: "Back to home",
    badge: "Pricing",
    title: "Simple plans for local businesses.",
    description:
      "Choose the plan that fits your review volume. Every plan includes Google review reply automation, approval mode, and multi-language support.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "Save 2 months",
    monthlyLabel: "per month",
    yearlyLabel: "per year",
    billedYearly: "Billed yearly",
    choose: "Choose plan",
    repliesLabel: "Replies included",
    locationsLabel: "Locations",
    idealForLabel: "Best for",
    allPlansTitle: "Included in every plan",
    allPlans: [
      "Instant replies to Google reviews",
      "Approval mode or auto-posting",
      "You choose the tone of your replies",
      "Multi-language reply generation",
    ],
    sharedFeatures: [
      "Instant replies to Google reviews",
      "Approval mode or auto-posting",
      "You choose the tone of your replies",
      "Multi-language reply generation",
      "Email draft notifications",
    ],
    plans: {
      starter: {
        name: "Starter",
        idealFor: "Small local businesses",
        monthlyPrice: "$19",
        yearlyPrice: "$190",
        replies: "Up to 300 replies / month",
        locations: "1 location",
        description:
          "A clean starting plan for one business that wants Replyo to handle everyday review replies.",
        cta: "Start Starter",
      },
      growth: {
        name: "Growth",
        idealFor: "Busy single-location businesses",
        monthlyPrice: "$39",
        yearlyPrice: "$390",
        replies: "Up to 1000 replies / month",
        locations: "1 location",
        description:
          "For higher-volume businesses that want more capacity without changing their workflow.",
        cta: "Choose Growth",
      },
      scale: {
        name: "Scale",
        idealFor: "High-volume or multi-location teams",
        monthlyPrice: "$79",
        yearlyPrice: "$790",
        replies: "Up to 3000 replies / month",
        locations: "1 location",
        description:
          "Built for businesses with heavier review volume that need more monthly capacity from the same workflow.",
        cta: "Choose Scale",
      },
    },
  },
  fr: {
    back: "Retour a l'accueil",
    badge: "Tarifs",
    title: "Des plans simples pour les commerces locaux.",
    description:
      "Choisissez le plan adapte a votre volume d'avis. Chaque plan inclut l'automatisation des reponses Google, le mode validation et la gestion multilingue.",
    monthly: "Mensuel",
    yearly: "Annuel",
    yearlyBadge: "Economisez 2 mois",
    monthlyLabel: "par mois",
    yearlyLabel: "par an",
    billedYearly: "Facture annuellement",
    choose: "Choisir ce plan",
    repliesLabel: "Reponses incluses",
    locationsLabel: "Etablissements",
    idealForLabel: "Ideal pour",
    allPlansTitle: "Inclus dans chaque plan",
    allPlans: [
      "Reponses instantanees aux avis Google",
      "Mode validation ou publication automatique",
      "Vous choisissez le ton des reponses",
      "Generation de reponses multilingues",
    ],
    sharedFeatures: [
      "Reponses instantanees aux avis Google",
      "Mode validation ou publication automatique",
      "Vous choisissez le ton des reponses",
      "Generation de reponses multilingues",
      "Notifications e-mail pour les brouillons",
    ],
    plans: {
      starter: {
        name: "Starter",
        idealFor: "Petits commerces locaux",
        monthlyPrice: "$19",
        yearlyPrice: "$190",
        replies: "Jusqu'a 300 reponses / mois",
        locations: "1 etablissement",
        description:
          "Une formule simple pour un business qui veut laisser Replyo gerer les reponses du quotidien.",
        cta: "Commencer Starter",
      },
      growth: {
        name: "Growth",
        idealFor: "Business actifs avec un seul etablissement",
        monthlyPrice: "$39",
        yearlyPrice: "$390",
        replies: "Jusqu'a 1000 reponses / mois",
        locations: "1 etablissement",
        description:
          "Pour les businesses avec plus de volume qui veulent plus de capacite sans changer leur workflow.",
        cta: "Choisir Growth",
      },
      scale: {
        name: "Scale",
        idealFor: "Equipes multi-sites ou gros volume",
        monthlyPrice: "$79",
        yearlyPrice: "$790",
        replies: "Jusqu'a 3000 reponses / mois",
        locations: "1 etablissement",
        description:
          "Concu pour les businesses avec un volume plus important qui ont besoin de plus de capacite mensuelle.",
        cta: "Choisir Scale",
      },
    },
  },
  es: {
    back: "Volver al inicio",
    badge: "Precios",
    title: "Planes simples para negocios locales.",
    description:
      "Elige el plan que encaja con tu volumen de resenas. Todos incluyen automatizacion de respuestas en Google, modo aprobacion y soporte multilenguaje.",
    monthly: "Mensual",
    yearly: "Anual",
    yearlyBadge: "Ahorra 2 meses",
    monthlyLabel: "por mes",
    yearlyLabel: "por ano",
    billedYearly: "Facturado anualmente",
    choose: "Elegir plan",
    repliesLabel: "Respuestas incluidas",
    locationsLabel: "Ubicaciones",
    idealForLabel: "Ideal para",
    allPlansTitle: "Incluido en todos los planes",
    allPlans: [
      "Respuestas instantaneas a resenas de Google",
      "Modo aprobacion o publicacion automatica",
      "Tu eliges el tono de las respuestas",
      "Generacion de respuestas en varios idiomas",
    ],
    sharedFeatures: [
      "Respuestas instantaneas a resenas de Google",
      "Modo aprobacion o publicacion automatica",
      "Tu eliges el tono de las respuestas",
      "Generacion de respuestas en varios idiomas",
      "Notificaciones por email para borradores",
    ],
    plans: {
      starter: {
        name: "Starter",
        idealFor: "Pequenos negocios locales",
        monthlyPrice: "$19",
        yearlyPrice: "$190",
        replies: "Hasta 300 respuestas / mes",
        locations: "1 ubicacion",
        description:
          "Un plan claro para un negocio que quiere dejar en manos de Replyo las respuestas del dia a dia.",
        cta: "Empezar Starter",
      },
      growth: {
        name: "Growth",
        idealFor: "Negocios activos con una sola ubicacion",
        monthlyPrice: "$39",
        yearlyPrice: "$390",
        replies: "Hasta 1000 respuestas / mes",
        locations: "1 ubicacion",
        description:
          "Para negocios con mas volumen que necesitan mas capacidad sin complicar el flujo de trabajo.",
        cta: "Elegir Growth",
      },
      scale: {
        name: "Scale",
        idealFor: "Equipos multiubicacion o alto volumen",
        monthlyPrice: "$79",
        yearlyPrice: "$790",
        replies: "Hasta 3000 respuestas / mes",
        locations: "1 ubicacion",
        description:
          "Pensado para negocios con mucho volumen que necesitan mayor capacidad mensual con el mismo flujo.",
        cta: "Elegir Scale",
      },
    },
  },
  ar: {
    back: "العودة الى الرئيسية",
    badge: "الاسعار",
    title: "خطط واضحة للشركات المحلية.",
    description:
      "اختر الخطة المناسبة لحجم التقييمات لديك. كل خطة تشمل اتمتة الردود على Google ووضع المراجعة قبل النشر ودعم عدة لغات.",
    monthly: "شهري",
    yearly: "سنوي",
    yearlyBadge: "وفر شهرين",
    monthlyLabel: "شهريا",
    yearlyLabel: "سنويا",
    billedYearly: "يتم الدفع سنويا",
    choose: "اختر الخطة",
    repliesLabel: "الردود المشمولة",
    locationsLabel: "الفروع",
    idealForLabel: "مناسبة لـ",
    allPlansTitle: "موجود في كل الخطط",
    allPlans: [
      "ردود فورية على تقييمات Google",
      "وضع الموافقة قبل النشر او النشر التلقائي",
      "انت تختار نبرة الردود",
      "انشاء ردود بعدة لغات",
    ],
    sharedFeatures: [
      "ردود فورية على تقييمات Google",
      "وضع الموافقة قبل النشر او النشر التلقائي",
      "انت تختار نبرة الردود",
      "انشاء ردود بعدة لغات",
      "اشعارات بريدية عند جاهزية المسودات",
    ],
    plans: {
      starter: {
        name: "Starter",
        idealFor: "الاعمال المحلية الصغيرة",
        monthlyPrice: "$19",
        yearlyPrice: "$190",
        replies: "حتى 300 رد / الشهر",
        locations: "فرع واحد",
        description:
          "خطة بسيطة لنشاط واحد يريد ان يترك لريبلايو مهمة الرد على التقييمات اليومية.",
        cta: "ابدأ Starter",
      },
      growth: {
        name: "Growth",
        idealFor: "النشاطات المزدحمة ذات الفرع الواحد",
        monthlyPrice: "$39",
        yearlyPrice: "$390",
        replies: "حتى 1000 رد / الشهر",
        locations: "فرع واحد",
        description:
          "للنشاطات ذات الحجم الاعلى التي تحتاج سعة اكبر بدون تعقيد في طريقة العمل.",
        cta: "اختر Growth",
      },
      scale: {
        name: "Scale",
        idealFor: "الفرق متعددة الفروع او الحجم العالي",
        monthlyPrice: "$79",
        yearlyPrice: "$790",
        replies: "حتى 3000 رد / الشهر",
        locations: "فرع واحد",
        description:
          "مصممة للشركات ذات الحجم الكبير التي تحتاج سعة شهرية اعلى مع نفس طريقة العمل.",
        cta: "اختر Scale",
      },
    },
  },
  de: {
    back: "Zur Startseite",
    badge: "Preise",
    title: "Klare Plaene fuer lokale Unternehmen.",
    description:
      "Waehle den Plan, der zu deinem Bewertungsvolumen passt. Jeder Plan enthaelt Google-Antwortautomatisierung, Freigabemodus und mehrsprachige Antworten.",
    monthly: "Monatlich",
    yearly: "Jaehrlich",
    yearlyBadge: "2 Monate sparen",
    monthlyLabel: "pro Monat",
    yearlyLabel: "pro Jahr",
    billedYearly: "Jaehrliche Abrechnung",
    choose: "Plan waehlen",
    repliesLabel: "Enthaltene Antworten",
    locationsLabel: "Standorte",
    idealForLabel: "Ideal fuer",
    allPlansTitle: "In jedem Plan enthalten",
    allPlans: [
      "Sofortige Antworten auf Google-Bewertungen",
      "Freigabemodus oder Auto-Posting",
      "Du bestimmst den Ton der Antworten",
      "Antworten in mehreren Sprachen",
    ],
    sharedFeatures: [
      "Sofortige Antworten auf Google-Bewertungen",
      "Freigabemodus oder Auto-Posting",
      "Du bestimmst den Ton der Antworten",
      "Antworten in mehreren Sprachen",
      "E-Mail-Benachrichtigungen fuer Entwuerfe",
    ],
    plans: {
      starter: {
        name: "Starter",
        idealFor: "Kleine lokale Unternehmen",
        monthlyPrice: "$19",
        yearlyPrice: "$190",
        replies: "Bis zu 300 Antworten / Monat",
        locations: "1 Standort",
        description:
          "Ein klarer Einstieg fuer ein Unternehmen, das die taeglichen Bewertungsantworten an Replyo abgeben moechte.",
        cta: "Starter waehlen",
      },
      growth: {
        name: "Growth",
        idealFor: "Ausgelastete Unternehmen mit einem Standort",
        monthlyPrice: "$39",
        yearlyPrice: "$390",
        replies: "Bis zu 1000 Antworten / Monat",
        locations: "1 Standort",
        description:
          "Fuer Unternehmen mit hoeherem Volumen, die mehr Kapazitaet ohne mehr Komplexitaet brauchen.",
        cta: "Growth waehlen",
      },
      scale: {
        name: "Scale",
        idealFor: "Multi-Standort-Teams oder hohes Volumen",
        monthlyPrice: "$79",
        yearlyPrice: "$790",
        replies: "Bis zu 3000 Antworten / Monat",
        locations: "1 Standort",
        description:
          "Entwickelt fuer Unternehmen mit hoeherem Volumen, die mehr monatliche Kapazitaet im gleichen Workflow brauchen.",
        cta: "Scale waehlen",
      },
    },
  },
};

const planOrder = ["starter", "growth", "scale"];

export default function PricingPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const copy = pricingCopy[language] || pricingCopy.en;
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateViewportMode() {
      setIsMobile(window.innerWidth < 768);
    }

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  const plans = planOrder.map((planKey) => {
    const plan = copy.plans[planKey];
    const isYearly = billingCycle === "yearly";
    return {
      ...plan,
      id: `${planKey}-${billingCycle}`,
      planKey,
      price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
      cadence: isYearly ? copy.yearlyLabel : copy.monthlyLabel,
      highlight: planKey === "growth",
    };
  });

  function handleSelectPlan(plan) {
    const nextBillingDate =
      billingCycle === "yearly" ? "April 4, 2027" : "May 4, 2026";

    const locationLimit = 1;

    writeStoredValue(BILLING_STORAGE_KEY, {
      ...defaultBilling,
      status: "active",
      planId: plan.id,
      planName: plan.name,
      amountLabel: `${plan.price} ${plan.cadence}`.trim(),
      cadence: billingCycle === "yearly" ? copy.yearly : copy.monthly,
      nextBillingDate,
      selectedAt: new Date().toISOString(),
      locationLimit,
    });

    router.push("/signup");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 42%, #edf3ff 100%)",
        padding: "clamp(28px, 6vw, 56px) 20px 90px",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
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
            padding: "clamp(24px, 5vw, 40px)",
            boxShadow: "0 22px 55px rgba(23,32,51,0.18)",
            marginBottom: "26px",
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "22px",
              alignItems: "end",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(34px, 7vw, 52px)",
                  lineHeight: 1.05,
                  marginBottom: "14px",
                }}
              >
                {copy.title}
              </h1>
              <p
                style={{
                  maxWidth: "760px",
                  color: "rgba(255,248,236,0.82)",
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div style={{ textAlign: "center", width: isMobile ? "100%" : "auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(23,32,51,0.06)",
                border: "1px solid rgba(23,32,51,0.1)",
                borderRadius: "999px",
                padding: "6px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {[
                { id: "monthly", label: copy.monthly },
                { id: "yearly", label: copy.yearly },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setBillingCycle(option.id)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "999px",
                    padding: "11px 18px",
                    fontWeight: "700",
                    fontSize: "14px",
                    background:
                      billingCycle === option.id ? "#172033" : "transparent",
                    color:
                      billingCycle === option.id ? "#fff8ec" : "#172033",
                    minWidth: isMobile ? "calc(50% - 4px)" : "140px",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {billingCycle === "yearly" ? (
              <div
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  background: "rgba(215,169,75,0.16)",
                  color: "#8d6413",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {copy.yearlyBadge}
              </div>
            ) : null}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "repeat(3, minmax(0, 1fr))",
            gap: "22px",
            marginBottom: "28px",
          }}
        >
          {plans.map((plan) => (
            <article
              key={plan.id}
              style={{
                background: "#ffffff",
                borderRadius: "28px",
                padding: "28px",
                border: plan.highlight
                  ? "1px solid rgba(215,169,75,0.55)"
                  : "1px solid rgba(23,32,51,0.08)",
                boxShadow: plan.highlight
                  ? "0 22px 45px rgba(215,169,75,0.14)"
                  : "0 16px 38px rgba(82,95,127,0.12)",
                display: "grid",
                gridTemplateRows: "auto auto auto auto",
                gap: "18px",
                alignContent: "start",
                minHeight: isMobile ? "auto" : "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 auto auto 0",
                  width: "100%",
                  height: plan.highlight ? "6px" : "4px",
                  background: plan.highlight
                    ? "linear-gradient(90deg, #d7a94b 0%, #f2d37b 100%)"
                    : "linear-gradient(90deg, rgba(23,32,51,0.14) 0%, rgba(23,32,51,0.04) 100%)",
                }}
              />

              <div>
                <h2
                  style={{
                    fontSize: "30px",
                    color: "#172033",
                    marginBottom: "10px",
                    lineHeight: 1.1,
                  }}
                >
                  {plan.name}
                </h2>

                <div
                  style={{
                    color: "#273244",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#667085",
                      marginBottom: "4px",
                      fontWeight: "700",
                    }}
                  >
                    {copy.idealForLabel}
                  </div>
                  <div
                    style={{
                      color: "#172033",
                      fontWeight: "700",
                      lineHeight: 1.5,
                      fontSize: "14px",
                    }}
                  >
                    {plan.idealFor}
                  </div>
                </div>

                <p
                  style={{
                    color: "#5b6473",
                    lineHeight: 1.7,
                    margin: 0,
                    fontSize: "15px",
                    maxWidth: "34ch",
                  }}
                >
                  {plan.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "46px",
                    fontWeight: "800",
                    color: "#172033",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}
                >
                  {plan.price}
                </div>

                <div
                  style={{
                    color: "#5b6473",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginBottom: billingCycle === "yearly" ? "6px" : "14px",
                  }}
                >
                  {plan.cadence}
                </div>

                {billingCycle === "yearly" ? (
                  <div
                    style={{
                      color: "#9a6f14",
                      fontSize: "13px",
                      fontWeight: "700",
                      marginBottom: "14px",
                    }}
                  >
                    {copy.billedYearly}
                  </div>
                ) : null}
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(23,32,51,0.08)",
                }}
              >
                {[
                  plan.replies,
                  plan.locations,
                  ...copy.sharedFeatures,
                ].map((item) => (
                  <div key={item} style={{ color: "#273244", lineHeight: 1.6 }}>
                    {`• ${item}`}
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
                  padding: "15px 16px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  marginTop: isMobile ? 0 : "auto",
                }}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </section>

        <section
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(23,32,51,0.08)",
            borderRadius: "28px",
            padding: "clamp(22px, 5vw, 30px)",
            boxShadow: "0 16px 34px rgba(82,95,127,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 30px)",
              color: "#172033",
              marginBottom: "16px",
            }}
          >
            {copy.allPlansTitle}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "14px",
            }}
          >
            {copy.allPlans.map((item) => (
              <div
                key={item}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "16px",
                  border: "1px solid rgba(23,32,51,0.08)",
                  color: "#273244",
                  lineHeight: 1.6,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
