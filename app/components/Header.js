"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    function updateViewportMode() {
      setIsCompact(window.innerWidth < 768);
    }

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  const isLoggedIn =
    isMounted && status === "authenticated" && Boolean(session?.user?.email);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: isCompact ? "center" : "space-between",
        alignItems: "center",
        padding: isCompact ? "14px 16px" : "18px 28px",
        borderBottom: "1px solid rgba(23,32,51,0.08)",
        background: "rgba(255,255,255,0.82)",
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
            width: "44px",
            height: "44px",
            borderRadius: "15px",
            background: "linear-gradient(145deg, #172033 0%, #31598e 100%)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 22px rgba(23,32,51,0.14)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#f8f3e7",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              transform: "translateY(-0.5px)",
            }}
          >
            R
          </span>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-2px",
              top: "-2px",
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#d7a94b",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.9)",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "9px",
              bottom: "-4px",
              width: "12px",
              height: "12px",
              borderRadius: "4px",
              background: "#31598e",
              transform: "rotate(45deg)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontSize: "23px",
              fontWeight: "800",
              letterSpacing: "-0.055em",
              color: "#111827",
            }}
          >
            Repl
            <span style={{ color: "#31598e" }}>y</span>
            <span style={{ color: "#d7a94b" }}>o</span>
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(23,32,51,0.56)",
              marginTop: "4px",
            }}
          >
            Review Replies
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
        <Link href="/" style={{ textDecoration: "none", color: "#111827" }}>
          {t.header.home}
        </Link>

        <Link
          href="/how-it-works"
          style={{ textDecoration: "none", color: "#111827", whiteSpace: "nowrap" }}
        >
          {t.header.how}
        </Link>

        <Link
          href="/why-replyo"
          style={{ textDecoration: "none", color: "#111827", whiteSpace: "nowrap" }}
        >
          {t.header.why}
        </Link>

        <Link
          href="/pricing"
          style={{ textDecoration: "none", color: "#111827", whiteSpace: "nowrap" }}
        >
          {t.header.pricing}
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              style={{ textDecoration: "none", color: "#111827", whiteSpace: "nowrap" }}
            >
              {t.header.dashboard}
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              background: "#172033",
              padding: isCompact ? "9px 14px" : "10px 16px",
              borderRadius: "12px",
              fontWeight: "500",
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
