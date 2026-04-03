"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function PricingPage() {
  const { t, language } = useLanguage();
  const plans = t.pricing.plans.map((plan, index) => ({
    name: plan[0],
    price: plan[1],
    description: plan[2],
    features: plan[3],
    highlight: index === 1,
  }));

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        padding: "56px 20px 90px",
        fontFamily: "Arial, sans-serif",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← {t.pricing.back}
          </Link>
        </div>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "28px",
            padding: "34px",
            boxShadow: "0 22px 55px rgba(23,32,51,0.18)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              color: "#fff8ec",
              borderRadius: "999px",
              padding: "8px 12px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {t.pricing.badge}
          </div>
          <h1 style={{ fontSize: "48px", lineHeight: 1.05, marginBottom: "14px" }}>
            {t.pricing.title}
          </h1>
          <p
            style={{
              maxWidth: "760px",
              color: "rgba(255,248,236,0.8)",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {t.pricing.description}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              style={{
                background: plan.highlight ? "#fff8e6" : "#ffffff",
                borderRadius: "24px",
                padding: "26px",
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
                  {t.pricing.practical}
                </div>
              ) : null}

              <h2 style={{ fontSize: "26px", color: "#172033", marginBottom: "8px" }}>
                {plan.name}
              </h2>
              <div style={{ fontSize: "40px", fontWeight: "700", color: "#172033", marginBottom: "10px" }}>
                {plan.price}
                {plan.price !== "Custom" ? (
                  <span style={{ fontSize: "16px", color: "#6b7280", fontWeight: "400" }}>
                    {" "}
                    {` ${t.pricing.month}`}
                  </span>
                ) : null}
              </div>
              <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
                {plan.description}
              </p>

              <div style={{ display: "grid", gap: "10px", marginBottom: "24px" }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ color: "#273244", lineHeight: 1.6 }}>
                    {`• ${feature}`}
                  </div>
                ))}
              </div>

              <Link
                href="/signup"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: plan.highlight ? "#172033" : "#eff3fb",
                  color: plan.highlight ? "#fff" : "#172033",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  fontWeight: "600",
                }}
              >
                {plan.price === "Custom" ? t.pricing.custom : t.pricing.start}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
