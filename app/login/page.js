"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useLanguage } from "../components/LanguageProvider";

export default function LoginPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError(t.auth.invalid);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#07090d",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
          background: "rgba(255,255,255,0.025)",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "12px", color: "#ffffff", letterSpacing: "-0.04em" }}>
          {t.auth.loginTitle}
        </h1>

        <p style={{ color: "rgba(248,250,252,0.62)", marginBottom: "24px", lineHeight: 1.7 }}>
          {t.auth.loginDesc}
        </p>

        <div
          style={{
            background: "rgba(251,188,5,0.08)",
            border: "1px solid rgba(251,188,5,0.2)",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "18px",
            color: "#f7d676",
            lineHeight: 1.6,
            fontSize: "14px",
          }}
        >
          {t.auth.demoTitle}
          <br />
          <strong>{t.auth.email}:</strong> `mohalbi123@icloud.com`
          <br />
          <strong>{t.auth.password}:</strong> `France1985`
        </div>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "14px" }}>
          <input
            type="email"
            placeholder={t.auth.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "15px",
              background: "rgba(255,255,255,0.03)",
              color: "#ffffff",
            }}
          />

          <input
            type="password"
            placeholder={t.auth.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "15px",
              background: "rgba(255,255,255,0.03)",
              color: "#ffffff",
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#ffffff",
              color: "#07090d",
              border: "none",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "16px",
              cursor: isSubmitting ? "wait" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? t.auth.loggingIn : t.auth.login}
          </button>
        </form>

        {error ? (
          <div style={{ marginTop: "12px", color: "#ffb4b4", fontSize: "14px" }}>
            {error}
          </div>
        ) : null}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ color: "rgba(248,250,252,0.56)" }}>{t.auth.noAccount} </span>
          <Link
            href="/signup"
            style={{
              color: "#ffffff",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            {t.auth.signUp}
          </Link>
        </div>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <GoogleAuthButton label={t.auth.continueGoogle} />
        </div>
      </div>
    </main>
  );
}
