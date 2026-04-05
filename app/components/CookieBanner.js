"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const STORAGE_KEY = "replyo-cookie-consent";

export default function CookieBanner() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    setMounted(true);
    const savedValue = window.localStorage.getItem(STORAGE_KEY);
    setAccepted(savedValue === "accepted");
  }, []);

  function handleAccept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setAccepted(true);
  }

  if (!mounted || accepted) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        right: "20px",
        bottom: "20px",
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "860px",
          background: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(23,32,51,0.12)",
          borderRadius: "22px",
          boxShadow: "0 22px 48px rgba(23,32,51,0.18)",
          padding: "18px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          direction: language === "ar" ? "rtl" : "ltr",
          pointerEvents: "auto",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ flex: "1 1 360px", color: "#364152", lineHeight: 1.65, fontSize: "14px" }}>
          {t.cookieBanner.text}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href="/cookies"
            style={{
              color: "#172033",
              textDecoration: "none",
              fontWeight: "600",
              padding: "12px 14px",
            }}
          >
            {t.cookieBanner.learn}
          </Link>

          <button
            type="button"
            onClick={handleAccept}
            style={{
              background: "#172033",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              padding: "12px 18px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {t.cookieBanner.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
