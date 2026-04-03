"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import GoogleAuthButton from "../components/GoogleAuthButton";
import {
  CONNECTION_STORAGE_KEY,
  REVIEWS_STORAGE_KEY,
  createDemoReviewsForLocation,
  defaultConnection,
  readStoredValue,
  writeStoredValue,
} from "../lib/demoState";

function ConnectGoogleContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [connection, setConnection] = useState(defaultConnection);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationsError, setLocationsError] = useState("");

  useEffect(() => {
    const storedConnection = {
      ...defaultConnection,
      ...readStoredValue(CONNECTION_STORAGE_KEY, defaultConnection),
    };

    setConnection(storedConnection);
    setSelectedLocationId(storedConnection.selectedLocationId || "");
    setIsSelectingLocation(storedConnection.isConnected);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <main style={{ padding: "40px" }}>Loading...</main>;
  }

  if (!session) {
    return <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>Redirecting to login...</main>;
  }

  async function loadLocations() {
    setIsLoadingLocations(true);
    setLocationsError("");

    try {
      const response = await fetch("/api/google-business/locations");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load Google Business locations.");
      }

      setAvailableLocations(data.locations || []);
      setSelectedLocationId((currentId) => currentId || data.locations?.[0]?.id || "");
      setIsSelectingLocation(true);
    } catch (error) {
      setLocationsError(
        error instanceof Error
          ? error.message
          : "Could not load Google Business locations."
      );
    } finally {
      setIsLoadingLocations(false);
    }
  }

  function handleConnect() {
    const selectedLocation = availableLocations.find(
      (location) => location.id === selectedLocationId
    );

    if (!selectedLocation) {
      return;
    }

    const nextConnection = {
      isConnected: true,
      provider: "Google Business Profile",
      selectedLocationId: selectedLocation.id,
      selectedLocationName: selectedLocation.name,
      selectedLocationType: selectedLocation.type,
      selectedLocationCategory: selectedLocation.primaryCategory,
      selectedLocationCity: selectedLocation.accountName,
      syncedAt: new Date().toISOString(),
    };

    writeStoredValue(CONNECTION_STORAGE_KEY, nextConnection);
    writeStoredValue(REVIEWS_STORAGE_KEY, createDemoReviewsForLocation({
      id: selectedLocation.id,
      name: selectedLocation.name,
      type: selectedLocation.type,
      city: selectedLocation.accountName,
      primaryCategory: selectedLocation.primaryCategory.toLowerCase(),
    }));
    setConnection(nextConnection);
    setIsSelectingLocation(true);
  }

  function handleDisconnect() {
    writeStoredValue(CONNECTION_STORAGE_KEY, defaultConnection);
    setConnection(defaultConnection);
    setIsSelectingLocation(false);
    setAvailableLocations([]);
    setSelectedLocationId("");
  }

  function handleStartConnect() {
    if (session.user?.provider === "google") {
      loadLocations();
      return true;
    }
    return false;
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            Google Business onboarding
          </div>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
            Connect Google Business to Replyo.
          </h1>
          <p style={{ color: "rgba(255,248,236,0.8)", lineHeight: 1.7, margin: 0 }}>
            A new client should first connect Google Business. After that, Replyo can
            detect the businesses in the account and let the owner choose which one
            to manage for reviews.
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
            {!isSelectingLocation ? (
              <>
                <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                  Step 1: Connect Google Business
                </h2>
                <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "18px" }}>
                  This is the first thing a new client should see. Once connected,
                  Replyo can fetch the businesses available in the Google Business account.
                </p>

                <div
                  style={{
                    background: "#f5f8ff",
                    borderRadius: "18px",
                    padding: "16px",
                    color: "#344054",
                    lineHeight: 1.7,
                    marginBottom: "18px",
                  }}
                >
                  In the live product, clicking this button opens Google consent,
                  then Replyo detects the businesses owned by that account.
                </div>

                {session.user?.provider === "google" ? (
                  <div
                    style={{
                      background: "#eefbf3",
                      color: "#1f7a45",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      marginBottom: "16px",
                    }}
                  >
                    Google account connected. Replyo can now try to load your Business Profiles.
                  </div>
                ) : null}

                {session.user?.provider === "google" ? (
                  <button
                    type="button"
                    onClick={handleStartConnect}
                    style={{
                      background: "#172033",
                      color: "#fff",
                      border: "none",
                      borderRadius: "14px",
                      padding: "14px 18px",
                      cursor: "pointer",
                      fontWeight: "600",
                      width: "100%",
                    }}
                  >
                    {isLoadingLocations ? "Loading businesses..." : "Load my Google businesses"}
                  </button>
                ) : (
                  <GoogleAuthButton
                    label="Connect Google Business"
                    callbackUrl="/connect-google"
                  />
                )}

                {locationsError ? (
                  <div
                    style={{
                      marginTop: "14px",
                      background: "#fff4f2",
                      color: "#9f1c00",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {locationsError}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
                  Step 2: Choose your business
                </h2>
                <p style={{ color: "#5b6473", lineHeight: 1.7, marginBottom: "16px" }}>
                  These are the businesses Replyo detected in the connected account.
                  Choose the one you want Replyo to monitor for reviews.
                </p>

                <div style={{ display: "grid", gap: "12px" }}>
                  {availableLocations.map((location) => (
                    <label
                      key={location.id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        padding: "14px",
                        borderRadius: "16px",
                        border:
                          selectedLocationId === location.id
                            ? "1px solid #172033"
                            : "1px solid #d7deed",
                        background:
                          selectedLocationId === location.id ? "#f5f8ff" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocationId === location.id}
                        onChange={() => setSelectedLocationId(location.id)}
                      />
                      <div>
                        <div style={{ fontWeight: "700", color: "#172033" }}>
                          {location.name}
                        </div>
                        <div style={{ color: "#5b6473", marginTop: "4px" }}>
                          {location.type} • {location.accountName}
                        </div>
                        <div style={{ color: "#7a8698", marginTop: "6px", fontSize: "13px" }}>
                          Google category: {location.primaryCategory}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
                  <button
                    type="button"
                    onClick={handleConnect}
                    style={{
                      background: "#172033",
                      color: "#fff",
                      border: "none",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Connect selected business
                  </button>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    style={{
                      background: "#eff3fb",
                      color: "#172033",
                      border: "1px solid #d7deed",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      cursor: "pointer",
                    }}
                  >
                    Start over
                  </button>
                </div>
              </>
            )}
          </section>

          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 16px 38px rgba(82,95,127,0.12)",
            }}
          >
            <h2 style={{ fontSize: "24px", color: "#172033", marginBottom: "12px" }}>
              Connection status
            </h2>
            <div
              style={{
                background: connection.isConnected ? "#eefbf3" : "#fff6df",
                color: connection.isConnected ? "#1f7a45" : "#8b5e00",
                borderRadius: "16px",
                padding: "14px 16px",
                marginBottom: "18px",
                fontWeight: "600",
              }}
            >
              {connection.isConnected ? "Business connected" : "No business connected yet"}
            </div>

            <p style={{ color: "#5b6473", lineHeight: 1.8 }}>
              <strong>Provider:</strong> {connection.provider}
              <br />
              <strong>Location:</strong>{" "}
              {connection.selectedLocationName || "Not selected"}
              <br />
              <strong>Business type:</strong>{" "}
              {connection.selectedLocationType || "Not selected"}
              <br />
              <strong>Primary category:</strong>{" "}
              {connection.selectedLocationCategory || "Not selected"}
              <br />
              <strong>City:</strong>{" "}
              {connection.selectedLocationCity || "Not selected"}
              <br />
              <strong>Last sync:</strong>{" "}
              {connection.syncedAt
                ? new Date(connection.syncedAt).toLocaleString()
                : "Not synced yet"}
            </p>

            <div
              style={{
                marginTop: "18px",
                background: "#f5f8ff",
                borderRadius: "16px",
                padding: "14px 16px",
                color: "#344054",
                lineHeight: 1.7,
              }}
            >
              Replyo will use the detected Google business category to adapt its tone
              and wording before generating replies.
            </div>

            <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
              <Link
                href="/inbox"
                style={{
                  textDecoration: "none",
                  background: "#172033",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Open review inbox
              </Link>
              <Link
                href="/settings"
                style={{
                  textDecoration: "none",
                  background: "#eff3fb",
                  color: "#172033",
                  borderRadius: "14px",
                  padding: "13px 14px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Adjust reply mode
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ConnectGooglePage() {
  return <ConnectGoogleContent />;
}
