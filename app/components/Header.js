"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const isAppArea =
    pathname === "/dashboard" ||
    pathname === "/inbox" ||
    pathname === "/connect-google";

  useEffect(() => {
    function updateViewportMode() {
      setIsCompact(window.innerWidth < 768);
    }

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: isCompact ? "center" : "space-between",
        alignItems: "center",
        padding: isCompact ? "14px 16px" : "18px 28px",
        borderBottom: isAppArea
          ? "1px solid rgba(23,32,51,0.08)"
          : "1px solid rgba(255,255,255,0.08)",
        background: isAppArea ? "rgba(255,255,255,0.82)" : "rgba(7,9,13,0.9)",
        backdropFilter: "blur(14px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        gap: "14px",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        aria-label="Go to Replyo home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            background: isAppArea ? "#172033" : "#ffffff",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isAppArea
              ? "0 12px 22px rgba(23,32,51,0.14)"
              : "0 12px 22px rgba(0,0,0,0.16)",
            flexShrink: 0,
            border: isAppArea
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(17,24,39,0.08)",
          }}
        >
          <span
            style={{
              color: isAppArea ? "#f8f3e7" : "#111111",
              fontSize: "21px",
              fontWeight: "800",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              position: "relative",
              transform: "translateY(-0.5px)",
            }}
          >
            R
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-1px",
                top: "1px",
                color: "#FBBC05",
                fontSize: "9px",
                lineHeight: 1,
                opacity: 0.95,
              }}
            >
              ★
            </span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontSize: "23px",
              fontWeight: "800",
              letterSpacing: "-0.055em",
              color: isAppArea ? "#111827" : "#ffffff",
            }}
          >
            Repl
            <span style={{ color: isAppArea ? "#31598e" : "#ffffff" }}>y</span>
            <span style={{ color: isAppArea ? "#d7a94b" : "#ffffff" }}>o</span>
          </span>
        </div>
      </Link>

      <nav
        style={{
          display: "flex",
          gap: isCompact ? "10px" : "18px",
          alignItems: "center",
          flexWrap: isCompact ? "nowrap" : "wrap",
          overflowX: isCompact ? "auto" : "visible",
          width: isCompact ? "100%" : "auto",
          justifyContent: isCompact ? "flex-start" : "flex-end",
          paddingBottom: isCompact ? "2px" : 0,
          scrollbarWidth: "none",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", color: isAppArea ? "#111827" : "rgba(255,255,255,0.88)" }}
        >
          {t.header.home}
        </Link>

        <Link
          href="/how-it-works"
          style={{
            textDecoration: "none",
            color: isAppArea ? "#111827" : "rgba(255,255,255,0.88)",
            whiteSpace: "nowrap",
          }}
        >
          {t.header.how}
        </Link>

        <Link
          href="/why-replyo"
          style={{
            textDecoration: "none",
            color: isAppArea ? "#111827" : "rgba(255,255,255,0.88)",
            whiteSpace: "nowrap",
          }}
        >
          {t.header.why}
        </Link>

        <Link
          href="/pricing"
          style={{
            textDecoration: "none",
            color: isAppArea ? "#111827" : "rgba(255,255,255,0.88)",
            whiteSpace: "nowrap",
          }}
        >
          {t.header.pricing}
        </Link>

        {isAppArea ? (
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", color: "#111827", whiteSpace: "nowrap" }}
          >
            {t.header.dashboard}
          </Link>
        ) : (
          <Link
            href="/login"
            style={{
              textDecoration: "none",
              color: isAppArea ? "#ffffff" : "#07090d",
              background: isAppArea ? "#172033" : "#ffffff",
              padding: isCompact ? "9px 14px" : "10px 16px",
              borderRadius: "12px",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            {t.header.login}
          </Link>
        )}
      </nav>
    </header>
  );
}
