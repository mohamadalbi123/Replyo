"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const disclosureCopy = {
  back: "Back to home",
  badge: "Third-Party Disclosure",
  title: "How Replyo works with Google Business Profile.",
  intro:
    "This page explains Replyo's role as a third-party tool that helps authorized businesses manage Google review replies. It is intended to make the relationship, permissions, and responsibilities clear before a customer connects a Google Business Profile.",
  sections: [
    [
      "Replyo is a third-party tool",
      [
        "Replyo is an independent software product and is not Google, is not part of Google, and is not endorsed by Google unless explicitly stated otherwise.",
        "Replyo can connect to Google Business Profile only after a user completes Google's OAuth authorization flow and grants the required permissions.",
      ],
    ],
    [
      "Who may use Replyo",
      [
        "Replyo is intended only for business owners, managers, staff members, agencies, or representatives who are authorized to manage the connected Google Business Profile.",
        "You must not connect or manage a Business Profile through Replyo unless you have permission to do so.",
      ],
    ],
    [
      "Authorization to respond to reviews",
      [
        "If you use Replyo to generate, approve, or publish review replies on behalf of a business, you confirm that you have that business's authorization to do so.",
        "If approval mode is enabled, replies remain inside Replyo until the user approves them.",
        "If auto-reply is enabled, Replyo may publish review replies on behalf of the connected and authorized business according to the settings chosen by that user.",
      ],
    ],
    [
      "Google policies still apply",
      [
        "All replies published through Replyo must remain compliant with Google's prohibited and restricted content policies, Google Business Profile product rules, and any other applicable Google requirements.",
        "Replyo may limit, pause, or remove features if we believe a workflow, message, or account setup could create compliance or platform risk.",
      ],
    ],
    [
      "Disconnecting access",
      [
        "A user may disconnect the Google Business Profile connection or revoke Google access at any time through the product settings or their Google account permissions.",
        "When access is removed, Replyo may immediately lose the ability to read business data, load locations, or publish replies.",
      ],
    ],
  ],
  updated: "Last updated: April 6, 2026",
};

export default function ThirdPartyDisclosurePage() {
  const { language } = useLanguage();

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
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ color: "rgba(248,250,252,0.62)", textDecoration: "none" }}>
            ← {disclosureCopy.back}
          </Link>
        </div>

        <section
          style={{
            background: "rgba(255,255,255,0.025)",
            borderRadius: "28px",
            padding: "34px",
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
              border: "1px solid rgba(255,255,255,0.08)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {disclosureCopy.badge}
          </div>

          <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", lineHeight: 0.96, letterSpacing: "-0.07em", marginBottom: "14px", color: "#ffffff" }}>
            {disclosureCopy.title}
          </h1>

          <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.75, marginBottom: "30px" }}>
            {disclosureCopy.intro}
          </p>

          <div style={{ display: "grid", gap: "22px" }}>
            {disclosureCopy.sections.map(([heading, points]) => (
              <section
                key={heading}
                style={{
                  padding: "20px 22px",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 style={{ margin: "0 0 12px", color: "#ffffff", fontSize: "22px" }}>{heading}</h2>
                <div style={{ display: "grid", gap: "10px" }}>
                  {points.map((point) => (
                    <p key={point} style={{ margin: 0, color: "rgba(248,250,252,0.66)", lineHeight: 1.75 }}>
                      {point}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p style={{ margin: "26px 0 0", color: "rgba(248,250,252,0.56)", fontWeight: "600" }}>
            {disclosureCopy.updated}
          </p>
        </section>
      </div>
    </main>
  );
}
