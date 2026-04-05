"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const cookieCopy = {
  back: "Back to home",
  badge: "Cookie Policy",
  title: "How Replyo uses cookies and similar technologies.",
  intro:
    "This Cookie Policy explains how Replyo uses cookies and related technologies on replyo.online. It works alongside the Privacy Policy and is intended to make the use of cookies more transparent for visitors, customers, and connected business users.",
  sections: [
    [
      "What cookies are",
      [
        "Cookies are small text files stored on your browser or device when you visit a website.",
        "They can be used to keep sessions active, remember preferences, improve security, and help services function properly.",
      ],
    ],
    [
      "How Replyo uses cookies",
      [
        "Replyo uses cookies for essential product functions such as login sessions, language preferences, security checks, and Google Business Profile connection flows.",
        "Replyo may also use cookies or similar technologies for diagnostics, abuse prevention, and analytics that help us understand site reliability and product usage.",
      ],
    ],
    [
      "Cookies currently relevant to the product",
      [
        "Session and authentication cookies that support account access and secure login handling.",
        "Google connection state cookies that help protect OAuth flows and prevent unauthorized connection attempts.",
        "Temporary Google Business Profile access-related cookies used during authorized connection and location-selection workflows.",
        "Preference cookies such as language choice and similar basic product settings.",
      ],
    ],
    [
      "Analytics and optional technologies",
      [
        "Replyo may use analytics or monitoring tools to understand feature usage, diagnose issues, and improve performance.",
        "If non-essential analytics cookies are added later, Replyo may provide additional notice or consent controls where required by law.",
      ],
    ],
    [
      "What Replyo does not use cookies for",
      [
        "Replyo does not use cookies to sell personal data.",
        "Replyo is not designed as an advertising network and does not rely on third-party ad targeting cookies as part of its core product workflow.",
      ],
    ],
    [
      "Managing cookies",
      [
        "You can usually control or delete cookies through your browser settings.",
        "Blocking essential cookies may prevent parts of Replyo from working correctly, including login, Google Business Profile connection, and account-related features.",
      ],
    ],
    [
      "Third-party services",
      [
        "Some connected services and infrastructure providers may use their own cookies or similar technologies when they support authentication, security, hosting, or embedded product functionality.",
        "Your use of those services may also be subject to their own privacy and cookie policies.",
      ],
    ],
    [
      "Changes and contact",
      [
        "Replyo may update this Cookie Policy from time to time to reflect product changes, legal requirements, or new technologies.",
        "For questions about cookies or tracking technologies used by Replyo, contact privacypolicy@replyo.online.",
      ],
    ],
  ],
  updated: "Last updated: April 6, 2026",
};

export default function CookiePage() {
  const { language } = useLanguage();

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
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← {cookieCopy.back}
          </Link>
        </div>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "34px",
            border: "1px solid rgba(23,32,51,0.08)",
            boxShadow: "0 18px 45px rgba(82,95,127,0.12)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "#e8f5ec",
              color: "#166b45",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            {cookieCopy.badge}
          </div>

          <h1 style={{ fontSize: "46px", lineHeight: 1.05, marginBottom: "14px", color: "#172033" }}>
            {cookieCopy.title}
          </h1>

          <p style={{ color: "#5b6474", lineHeight: 1.75, marginBottom: "30px" }}>{cookieCopy.intro}</p>

          <div style={{ display: "grid", gap: "22px" }}>
            {cookieCopy.sections.map(([heading, points]) => (
              <section
                key={heading}
                style={{
                  padding: "20px 22px",
                  borderRadius: "22px",
                  background: "#f9fbff",
                  border: "1px solid rgba(23,32,51,0.08)",
                }}
              >
                <h2 style={{ margin: "0 0 12px", color: "#172033", fontSize: "22px" }}>{heading}</h2>
                <div style={{ display: "grid", gap: "10px" }}>
                  {points.map((point) => (
                    <p key={point} style={{ margin: 0, color: "#5b6474", lineHeight: 1.75 }}>
                      {point}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p style={{ margin: "26px 0 0", color: "#5b6474", fontWeight: "600" }}>{cookieCopy.updated}</p>
        </section>
      </div>
    </main>
  );
}
