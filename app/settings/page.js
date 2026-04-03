"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import {
  CONNECTION_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  defaultConnection,
  defaultSettings,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

function SettingsContent() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState(defaultSettings);
  const [connection, setConnection] = useState(defaultConnection);

  useEffect(() => {
    setSettings({
      ...defaultSettings,
      ...readStoredValue(SETTINGS_STORAGE_KEY, defaultSettings),
    });
    setConnection({
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    });
  }, []);

  function updateSetting(field, value) {
    const nextSettings = {
      ...settings,
      [field]: value,
    };

    setSettings(nextSettings);
    writeStoredValue(SETTINGS_STORAGE_KEY, nextSettings);
  }

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>Loading settings...</main>;
  }

  if (!session) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h2>You must be logged in to access settings</h2>
        <button
          onClick={() => signIn("google")}
          style={{
            marginTop: "20px",
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #fff6df 0%, #f7f4ec 40%, #edf3ff 100%)",
        padding: "48px 20px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <Link href="/dashboard" style={{ color: "#4b5563", textDecoration: "none" }}>
            ← Back to dashboard
          </Link>
          <button
            onClick={() => signOut()}
            style={{
              background: "#172033",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <section
          style={{
            background: "#172033",
            color: "#fff8ec",
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            Account and operations
          </div>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Replyo settings</h1>
          <p style={{ color: "rgba(255,248,236,0.8)", lineHeight: 1.7, margin: 0 }}>
            This is where owners manage their connected account, business preferences,
            reply automation, and billing.
          </p>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              Business account
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7 }}>
              <strong>Owner:</strong> {session.user?.name || "Not available"}
              <br />
              <strong>Email:</strong> {session.user?.email || "Not available"}
              <br />
              <strong>Connected location:</strong>{" "}
              {connection.selectedLocationName || "No location connected yet"}
            </p>

            <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
              <Link
                href="/connect-google"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                }}
              >
                {connection.isConnected
                  ? "Manage Google Business connection"
                  : "Connect Google Business"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  writeStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
                  setConnection(defaultConnection);
                }}
                style={{
                  background: "#fff4f2",
                  color: "#9f1c00",
                  border: "1px solid #f2c2b6",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  cursor: "pointer",
                }}
              >
                Disconnect business account
              </button>
            </div>
          </section>

          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              Reply preferences
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  Brand tone
                </div>
                <select
                  value={settings.tone}
                  onChange={(event) => updateSetting("tone", event.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#172033",
                  }}
                >
                  <option>Warm, professional, and concise</option>
                  <option>Friendly and casual</option>
                  <option>Premium and polished</option>
                  <option>Calm and recovery-focused</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  Smart personalization
                </div>
                <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={settings.smartPersonalization}
                    onChange={(event) =>
                      updateSetting("smartPersonalization", event.target.checked)
                    }
                  />
                  <span style={{ color: "#172033", fontWeight: "600" }}>
                    Use business category, rating, and review wording to shape replies
                  </span>
                </label>
                <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "8px" }}>
                  {connection.selectedLocationCategory
                    ? `Current detected category: ${connection.selectedLocationCategory}`
                    : "Connect a business to detect its Google category."}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  Reply mode
                </div>
                <div style={{ display: "grid", gap: "10px" }}>
                  <label
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border:
                        settings.replyMode === "approval"
                          ? "1px solid #172033"
                          : "1px solid #d1d5db",
                    }}
                  >
                    <input
                      type="radio"
                      checked={settings.replyMode === "approval"}
                      onChange={() => updateSetting("replyMode", "approval")}
                    />
                    <span style={{ color: "#172033", fontWeight: "600" }}>
                      Review before posting
                    </span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border:
                        settings.replyMode === "auto"
                          ? "1px solid #172033"
                          : "1px solid #d1d5db",
                    }}
                  >
                    <input
                      type="radio"
                      checked={settings.replyMode === "auto"}
                      onChange={() => updateSetting("replyMode", "auto")}
                    />
                    <span style={{ color: "#172033", fontWeight: "600" }}>
                      I trust Replyo, post directly
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                  Alerts
                </div>
                <label style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={settings.alertsEnabled}
                    onChange={(event) =>
                      updateSetting("alertsEnabled", event.target.checked)
                    }
                  />
                  <span style={{ color: "#172033", fontWeight: "600" }}>
                    Email notifications enabled
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", marginBottom: "12px", color: "#172033" }}>
              Billing
            </h2>
            <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>Plan:</strong> Starter
              <br />
              <strong>Status:</strong> Active
              <br />
              <strong>Next invoice:</strong> April 30
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                href="/pricing"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#172033",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  fontWeight: "600",
                }}
              >
                Change plan
              </Link>
              <Link
                href="/inbox"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                }}
              >
                Open review inbox
              </Link>
              <button
                type="button"
                style={{
                  background: "#eff3fb",
                  color: "#172033",
                  border: "1px solid #d7deed",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  cursor: "pointer",
                }}
              >
                Update billing details
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <SessionProvider>
      <SettingsContent />
    </SessionProvider>
  );
}
