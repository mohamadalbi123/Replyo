"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { availableLanguages, useLanguage } from "./LanguageProvider";

const footerLinks = [
  { href: "/why-replyo", label: "Why Replyo" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/test-replyo", label: "Test Replyo" },
];

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const activeLanguage =
    availableLanguages.find((item) => item.code === language) || availableLanguages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer
      style={{
        background: "rgba(7,9,13,0.9)",
        color: "#f8fafc",
        padding: "clamp(24px, 6vw, 32px) clamp(18px, 5vw, 28px) 24px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            alignItems: "start",
            gap: "28px",
            marginBottom: "24px",
          }}
        >
          <section>
            <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>
              Replyo
            </div>
            <p
              style={{
                color: "rgba(248,250,252,0.66)",
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
                    color: "rgba(248,250,252,0.8)",
                    textDecoration: "none",
                  }}
                >
                  {link.href === "/why-replyo"
                    ? t.header.why
                    : link.href === "/how-it-works"
                      ? t.header.how
                      : link.href === "/pricing"
                        ? t.header.pricing
                        : link.href === "/contact"
                          ? t.footer.contact
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
                color: "rgba(248,250,252,0.66)",
                lineHeight: 1.7,
              }}
            >
              <Link
                href="/privacy"
                style={{
                  color: "rgba(248,250,252,0.8)",
                  textDecoration: "none",
                }}
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/cookies"
                style={{
                  color: "rgba(248,250,252,0.8)",
                  textDecoration: "none",
                }}
              >
                {t.footer.cookies}
              </Link>
              <Link
                href="/third-party-disclosure"
                style={{
                  color: "rgba(248,250,252,0.8)",
                  textDecoration: "none",
                }}
              >
                {t.footer.disclosure || "Third-Party Disclosure"}
              </Link>
              <div>{t.footer.googleNote}</div>
              <Link
                href="/terms"
                style={{
                  color: "rgba(248,250,252,0.8)",
                  textDecoration: "none",
                }}
              >
                {t.footer.terms}
              </Link>
              <Link
                href="/contact"
                style={{
                  color: "rgba(248,250,252,0.8)",
                  textDecoration: "none",
                }}
              >
                {t.footer.contact}
              </Link>
            </div>
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
          <div style={{ color: "rgba(248,250,252,0.5)", fontSize: "14px" }}>
            {t.footer.copyright}
          </div>

          <div
            style={{
              position: "relative",
              color: "rgba(248,250,252,0.8)",
              fontSize: "14px",
            }}
            ref={languageMenuRef}
          >
            <button
              type="button"
              onClick={() => setIsLanguageOpen((current) => !current)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.04)",
                color: "#f8fafc",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                padding: "10px 14px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <span>{t.footer.language}</span>
              <span style={{ fontSize: "18px", lineHeight: 1 }}>{activeLanguage.flag}</span>
              <span style={{ opacity: 0.78 }}>{activeLanguage.label}</span>
              <span style={{ opacity: 0.72 }}>{isLanguageOpen ? "▴" : "▾"}</span>
            </button>

            {isLanguageOpen ? (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: "calc(100% + 10px)",
                  minWidth: "220px",
                  background: "#0f1217",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px",
                  padding: "8px",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                  display: "grid",
                  gap: "6px",
                  zIndex: 20,
                }}
              >
                {availableLanguages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setIsLanguageOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      width: "100%",
                      background:
                        language === item.code ? "rgba(255,255,255,0.1)" : "transparent",
                      color: "#f8fafc",
                      border:
                        language === item.code
                          ? "1px solid rgba(255,255,255,0.12)"
                          : "1px solid transparent",
                      borderRadius: "14px",
                      padding: "10px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.flag}</span>
                      <span>{item.label}</span>
                    </span>
                    {language === item.code ? <span>✓</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
