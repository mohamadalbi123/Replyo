"use client";

import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

const privacyCopy = {
  back: "Back to home",
  badge: "Privacy Policy",
  title: "How Replyo collects, uses, and protects data.",
  intro:
    "This Privacy Policy explains how Replyo handles personal information, business information, connected Google Business Profile data, cookies, and review workflow data. It is written for visitors, customers, trial users, and authorized business representatives who use Replyo through the website or connected services.",
  sections: [
    [
      "Who this policy applies to",
      [
        "This policy applies to visitors to replyo.online, account holders, trial users, business managers, and anyone who contacts Replyo.",
        "It also applies to business profile information and review workflow data that a user chooses to connect through supported third-party services such as Google Business Profile.",
      ],
    ],
    [
      "What information Replyo may collect",
      [
        "Account information such as name, email address, login method, language preference, and subscription or trial status.",
        "Business information such as connected Google Business Profile location names, categories, metadata, selected locations, and workflow settings.",
        "Review workflow information such as review text, star ratings, drafted replies, edited replies, approval choices, posting status, and notification preferences.",
        "Technical and security information such as browser type, device information, IP address, cookie identifiers, and basic usage logs needed to keep the service reliable and secure.",
        "Support and communication information you choose to send when you contact Replyo.",
      ],
    ],
    [
      "How Replyo uses information",
      [
        "To operate the service, including connecting business profiles, loading locations, generating review replies, storing drafts, and supporting approval or automatic posting workflows.",
        "To personalize replies based on selected tone, language, review content, business category, and product settings.",
        "To manage accounts, subscriptions, security, fraud prevention, customer support, and service improvement.",
        "To comply with legal obligations and enforce our Terms of Service.",
      ],
    ],
    [
      "Google Business Profile data and permissions",
      [
        "When you connect Google Business Profile, Replyo only requests permissions relevant to the features you choose to use.",
        "Replyo may access business account information, location information, and review-related workflow data that you have authorized through Google's OAuth process.",
        "Replyo is intended only for businesses and representatives who are authorized to manage the connected Google Business Profile locations.",
        "If you disconnect the integration or revoke Google access, some features may stop working immediately and stored access tokens may be deleted or expire according to our retention and security practices.",
      ],
    ],
    [
      "AI-generated reply drafts",
      [
        "Replyo may use AI systems to generate suggested replies from the content of a review, selected language, business category, and reply settings.",
        "Drafts are generated to assist users, but users remain responsible for the replies they approve, edit, publish, or allow Replyo to publish on their behalf.",
      ],
    ],
    [
      "Cookies and similar technologies",
      [
        "Replyo uses cookies and similar technologies for essential product functions such as authentication, language preferences, connected Google Business Profile session state, and secure handling of authorized locations.",
        "Replyo may also use analytics or diagnostic technologies to understand site usage, improve reliability, and detect abuse. We do not use cookies to sell personal data.",
        "More detail is available in the Replyo Cookie Policy.",
      ],
    ],
    [
      "Legal bases for processing",
      [
        "Where European data protection law applies, Replyo may process personal data on the basis of contract performance, legitimate interests, legal obligations, and, where required, consent.",
        "Legitimate interests may include securing the service, preventing misuse, improving product performance, and supporting normal business operations.",
      ],
    ],
    [
      "How information may be shared",
      [
        "Replyo may share information with service providers that help us run the product, such as hosting, authentication, analytics, customer support, and infrastructure partners.",
        "Replyo may also share information when required by law, to respond to legal process, or to protect rights, security, and the integrity of the service.",
        "Replyo does not sell personal information.",
      ],
    ],
    [
      "International processing",
      [
        "Replyo operates online and may process information in more than one country depending on infrastructure, support, and service providers.",
        "Where required, we aim to use appropriate safeguards for international transfers of personal data.",
      ],
    ],
    [
      "Data retention and deletion",
      [
        "Replyo keeps information only for as long as needed to operate the service, provide support, maintain security records, comply with legal obligations, resolve disputes, and enforce our agreements.",
        "Users may request account deletion or data deletion, subject to information we need to keep for legal, tax, accounting, fraud-prevention, or security reasons.",
      ],
    ],
    [
      "Your rights",
      [
        "Depending on your location, you may have rights to access, correct, delete, restrict, object to, or export certain personal data.",
        "Users in the European Union may also have the right to lodge a complaint with their local data protection authority.",
      ],
    ],
    [
      "Children",
      [
        "Replyo is intended for business use and is not directed to children.",
        "If we learn that personal information has been provided by a child in a way that should not have happened, we will take appropriate steps to remove it where required.",
      ],
    ],
    [
      "Contact and policy updates",
      [
        "For privacy questions, data requests, or account deletion requests, contact Replyo at privacypolicy@replyo.online.",
        "Replyo may update this Privacy Policy from time to time. Material updates will be reflected on this page with a revised effective date.",
      ],
    ],
  ],
  updated: "Last updated: April 6, 2026",
};

export default function PrivacyPage() {
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
            ← {privacyCopy.back}
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
            {privacyCopy.badge}
          </div>

          <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", lineHeight: 0.96, letterSpacing: "-0.07em", marginBottom: "14px", color: "#ffffff" }}>
            {privacyCopy.title}
          </h1>

          <p style={{ color: "rgba(248,250,252,0.64)", lineHeight: 1.75, marginBottom: "30px" }}>
            {privacyCopy.intro}
          </p>

          <div style={{ display: "grid", gap: "22px" }}>
            {privacyCopy.sections.map(([heading, points]) => (
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

          <p style={{ margin: "26px 0 0", color: "rgba(248,250,252,0.56)", fontWeight: "600" }}>{privacyCopy.updated}</p>
        </section>
      </div>
    </main>
  );
}
