"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useLanguage } from "../components/LanguageProvider";

export default function SignupPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  async function handleEmailSignup(e) {
    e.preventDefault();
    setError("");

    if (!hasAgreed) {
      setError(t.auth.agreeRequired);
      return;
    }

    if (email !== "mohalbi123@icloud.com" || password !== "France1985") {
      setError(t.auth.useTemp);
      return;
    }

    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError(t.auth.createFail);
      return;
    }

    window.location.href = "/dashboard";
  }

  function handleGoogleConsentCheck() {
    if (!hasAgreed) {
      setError(t.auth.agreeRequired);
      return false;
    }

    setError("");
    return true;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #e5e7eb",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          background: "#fff",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "12px", color: "#111827" }}>
          {t.auth.signupTitle}
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          {t.auth.signupDesc}
        </p>

        <div
          style={{
            background: "#eef6ff",
            border: "1px solid #cfe0fb",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "18px",
            color: "#2f527e",
            lineHeight: 1.6,
            fontSize: "14px",
          }}
        >
          {t.auth.tempReady}
          <br />
          <strong>{t.auth.email}:</strong> `mohalbi123@icloud.com`
          <br />
          <strong>{t.auth.password}:</strong> `France1985`
        </div>

        <form onSubmit={handleEmailSignup} style={{ display: "grid", gap: "14px" }}>
          <input
            type="email"
            placeholder={t.auth.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
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
              border: "1px solid #d1d5db",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              color: "#4b5563",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(event) => {
                setHasAgreed(event.target.checked);
                if (event.target.checked) {
                  setError("");
                }
              }}
              style={{ marginTop: "4px" }}
            />
            <span>
              {t.auth.agreePrefix}{" "}
              <Link href="/terms" style={{ color: "#111827", fontWeight: "600", textDecoration: "none" }}>
                {t.auth.agreeTerms}
              </Link>{" "}
              {t.auth.agreeAnd}{" "}
              <Link href="/privacy" style={{ color: "#111827", fontWeight: "600", textDecoration: "none" }}>
                {t.auth.agreePrivacy}
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#111827",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "16px",
              cursor: isSubmitting ? "wait" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? t.auth.creating : t.auth.signupEmail}
          </button>
        </form>

        {error ? (
          <div style={{ marginTop: "12px", color: "#b42318", fontSize: "14px" }}>
            {error}
          </div>
        ) : null}

        <div
          style={{
            marginTop: "24px",
            display: "grid",
            gap: "12px",
          }}
        >
          <GoogleAuthButton
            label={t.auth.signupGoogle}
            disabled={!hasAgreed}
            onBeforeSubmit={handleGoogleConsentCheck}
          />

          <button
            type="button"
            onClick={() => alert("Apple signup will be added later.")}
            style={{
              width: "100%",
              background: "#f3f4f6",
              color: "#111827",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {t.auth.signupApple}
          </button>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span style={{ color: "#6b7280" }}>{t.auth.already} </span>
          <Link
            href="/login"
            style={{
              color: "#111827",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            {t.auth.login}
          </Link>
        </div>
      </div>
    </main>
  );
}
