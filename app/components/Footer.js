"use client";

import Link from "next/link";
import { availableLanguages, useLanguage } from "./LanguageProvider";

const footerLinks = [
  { href: "/why-replyo", label: "Why Replyo" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/test-replyo", label: "Test Replyo" },
];

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer
      style={{
        background: "#172033",
        color: "#fff8ec",
        padding: "32px 28px 24px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "22px",
            marginBottom: "24px",
          }}
        >
          <section>
            <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>
              Replyo
            </div>
            <p
              style={{
                color: "rgba(255,248,236,0.78)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {t.footer.brand}
            </p>
          </section>

          <section>
            <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>
              {t.footer.explore}
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "rgba(255,248,236,0.82)",
                    textDecoration: "none",
                  }}
                >
                  {link.href === "/why-replyo"
                    ? t.header.why
                    : link.href === "/how-it-works"
                      ? t.header.how
                      : link.href === "/pricing"
                        ? t.header.pricing
                        : t.livePreview.test}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>
              {t.footer.trust}
            </div>
            <div
              style={{
                display: "grid",
                gap: "10px",
                color: "rgba(255,248,236,0.78)",
                lineHeight: 1.7,
              }}
            >
              <div>{t.footer.privacy}</div>
              <div>{t.footer.googleNote}</div>
              <div>{t.footer.terms}</div>
            </div>
          </section>

          <section>
            <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>
              {t.footer.contact}
            </div>
            <div
              style={{
                color: "rgba(255,248,236,0.78)",
                lineHeight: 1.7,
                marginBottom: "14px",
              }}
            >
              {t.footer.contactText}
            </div>
            <a
              href="mailto:hello@replyo.app"
              style={{
                display: "inline-block",
                color: "#fff",
                textDecoration: "none",
                background: "rgba(255,255,255,0.1)",
                padding: "10px 14px",
                borderRadius: "12px",
              }}
            >
              hello@replyo.app
            </a>
          </section>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "center",
            paddingTop: "18px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "rgba(255,248,236,0.62)", fontSize: "14px" }}>
            {t.footer.copyright}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "rgba(255,248,236,0.82)",
              fontSize: "14px",
            }}
          >
            <span>{t.footer.language}</span>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {availableLanguages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  title={item.label}
                  aria-label={item.label}
                  style={{
                    background:
                      language === item.code
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border:
                      language === item.code
                        ? "1px solid rgba(255,255,255,0.34)"
                        : "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    width: "38px",
                    height: "38px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {item.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
