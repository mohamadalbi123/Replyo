"use client";

import { useEffect, useState } from "react";

export default function GoogleAuthButton({ label, callbackUrl = "/dashboard" }) {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCsrfToken() {
      try {
        const response = await fetch("/api/auth/csrf");
        const data = await response.json();

        if (isMounted) {
          setCsrfToken(data.csrfToken || "");
        }
      } catch (error) {
        console.error("Failed to load CSRF token:", error);
      }
    }

    loadCsrfToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <form method="post" action="/api/auth/signin/google">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <button
        type="submit"
        disabled={!csrfToken}
        style={{
          width: "100%",
          background: "#f3f4f6",
          color: "#111827",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          padding: "14px 18px",
          fontSize: "16px",
          cursor: csrfToken ? "pointer" : "not-allowed",
          opacity: csrfToken ? 1 : 0.7,
        }}
      >
        {csrfToken ? label : "Loading Google sign-in..."}
      </button>
    </form>
  );
}
