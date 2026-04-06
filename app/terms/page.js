"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const termsCopy = {
  back: "Back to home",
  badge: "Terms of Service",
  title: "The rules for using Replyo.",
  intro:
    "These Terms of Service govern your access to and use of Replyo. Replyo is designed for businesses, managers, and authorized representatives who want to manage Google review replies more efficiently. By using Replyo, you agree to these terms.",
  sections: [
    [
      "Use of the service",
      [
        "Replyo helps businesses generate, review, manage, and in some cases publish replies to customer reviews.",
        "You may only use Replyo for businesses, profiles, locations, and accounts that you own or are authorized to manage.",
      ],
    ],
    [
      "Accounts and eligibility",
      [
        "You must provide accurate information when you create or use an account and you are responsible for keeping your login credentials secure.",
        "You are responsible for activity that takes place through your account, including connected business locations, automation settings, and approved replies.",
      ],
    ],
    [
      "Google Business Profile and connected services",
      [
        "Certain Replyo features depend on third-party services such as Google Business Profile and require separate authorization through those services.",
        "Your use of Google Business Profile and other connected services remains subject to their own terms, permissions, technical limits, and API availability.",
        "Replyo may restrict access to selected locations according to your plan, onboarding choices, or backend authorization rules even if your connected Google account manages additional locations.",
      ],
    ],
    [
      "AI-generated reply drafts",
      [
        "Replyo may use AI systems to suggest or generate draft replies based on review content, rating, business category, language, tone preferences, and product settings.",
        "You remain responsible for all replies you approve, edit, publish, or allow Replyo to publish on your behalf.",
        "You should review AI-generated content carefully, especially for sensitive, legal, medical, financial, or reputational matters.",
      ],
    ],
    [
      "Acceptable use",
      [
        "You may not use Replyo to publish unlawful, abusive, misleading, discriminatory, fraudulent, infringing, or defamatory content.",
        "You may not use Replyo to access or manage business profiles, reviews, or locations without proper authorization.",
        "You may not misuse the service, abuse plan limits, interfere with the platform, reverse engineer restricted parts of the service, or attempt to bypass technical or billing restrictions.",
      ],
    ],
    [
      "Plans, subscriptions, and billing",
      [
        "Replyo may offer free trials, paid plans, usage limits, reply limits, and location limits.",
        "If paid billing is active, pricing, renewal timing, cancellation terms, and plan limits will be described in the product interface, checkout flow, or pricing page.",
        "Failure to pay fees when due may result in restricted access, suspension, or downgrade of features.",
      ],
    ],
    [
      "Availability and product changes",
      [
        "Replyo may add, remove, suspend, or change features at any time, including integrations that depend on third-party services or API approval.",
        "We aim to keep the service reliable, but uninterrupted or error-free availability cannot be guaranteed.",
      ],
    ],
    [
      "Intellectual property",
      [
        "Replyo, its software, brand, product design, and original content remain the property of Replyo or its licensors.",
        "You retain rights to the business materials and review-related content you lawfully provide, subject to the limited rights needed for Replyo to operate the service.",
      ],
    ],
    [
      "Disclaimers",
      [
        "Replyo is provided on an as-available and as-is basis to the extent permitted by law.",
        "Replyo does not guarantee that third-party APIs, integrations, or publishing workflows will always be available, accurate, or uninterrupted.",
        "Replyo does not guarantee any particular business outcome, ranking improvement, customer response, or revenue result.",
      ],
    ],
    [
      "Limitation of liability",
      [
        "To the extent permitted by applicable law, Replyo will not be liable for indirect, incidental, special, consequential, punitive, or business interruption damages.",
        "Nothing in these terms is intended to limit rights or liabilities that cannot legally be excluded under applicable law.",
      ],
    ],
    [
      "Suspension and termination",
      [
        "You may stop using Replyo at any time.",
        "Replyo may suspend or terminate access if we reasonably believe there has been misuse, unauthorized access, legal risk, security risk, repeated violation of these terms, or non-payment when billing is active.",
      ],
    ],
    [
      "Governing law",
      [
        "These terms are intended to be governed by the laws of France, except where mandatory local law requires otherwise.",
        "If any part of these terms is found unenforceable, the remaining parts will continue to apply to the maximum extent permitted by law.",
      ],
    ],
    [
      "Contact and updates",
      [
        "For legal, contractual, or account questions, contact Replyo at privacypolicy@replyo.online.",
        "Replyo may update these Terms of Service from time to time by posting the revised version on this page.",
      ],
    ],
  ],
  updated: "Last updated: April 6, 2026",
};

export default function TermsPage() {
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
            ← {termsCopy.back}
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
            {termsCopy.badge}
          </div>

          <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", lineHeight: 0.96, letterSpacing: "-0.07em", marginBottom: "14px", color: "#ffffff" }}>
            {termsCopy.title}
          </h1>

          <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.75, marginBottom: "30px" }}>{termsCopy.intro}</p>

          <div style={{ display: "grid", gap: "22px" }}>
            {termsCopy.sections.map(([heading, points]) => (
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

          <p style={{ margin: "26px 0 0", color: "rgba(248,250,252,0.56)", fontWeight: "600" }}>{termsCopy.updated}</p>
        </section>
      </div>
    </main>
  );
}
