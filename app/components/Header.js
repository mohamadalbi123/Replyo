"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn =
    isMounted && status === "authenticated" && Boolean(session?.user?.email);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 28px",
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image
          src="/logo.png"
          alt="Replyo"
          width={40}
          height={40}
          style={{ width: "40px", height: "40px" }}
          priority
        />
        <span
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          Replyo
        </span>
      </div>

      <nav style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#111827" }}>
          {t.header.home}
        </Link>

        <Link
          href="/how-it-works"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          {t.header.how}
        </Link>

        <Link
          href="/why-replyo"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          {t.header.why}
        </Link>

        <Link
          href="/pricing"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          {t.header.pricing}
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              {t.header.dashboard}
            </Link>

            <Link
              href="/inbox"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              {t.header.inbox}
            </Link>

            <Link
              href="/connect-google"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              {t.header.connect}
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              background: "#172033",
              padding: "10px 16px",
              borderRadius: "12px",
              fontWeight: "500",
            }}
          >
            {t.header.login}
          </Link>
        )}
      </nav>
    </header>
  );
}
