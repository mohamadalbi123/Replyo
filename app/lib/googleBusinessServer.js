import crypto from "crypto";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ACCESS_TOKEN_COOKIE = "replyo_gbp_access_token";
const ALLOWED_LOCATION_COOKIE = "replyo_gbp_allowed_location";
const LOCATION_SECRET = process.env.NEXTAUTH_SECRET || "replyo-location-secret";

function encodePayload(payload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function sign(value) {
  return crypto.createHmac("sha256", LOCATION_SECRET).update(value).digest("base64url");
}

function serializeSelection(selection) {
  const encoded = encodePayload(selection);
  return `${encoded}.${sign(encoded)}`;
}

function parseSelection(rawValue) {
  if (!rawValue || !rawValue.includes(".")) {
    return null;
  }

  const [encoded, signature] = rawValue.split(".");

  if (!encoded || !signature || sign(encoded) !== signature) {
    return null;
  }

  try {
    return decodePayload(encoded);
  } catch {
    return null;
  }
}

export async function requireReplyoSession() {
  const session = await getServerSession(authOptions);
  return session?.user?.email ? session : null;
}

export async function getGoogleBusinessAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || "";
}

export async function googleFetch(accessToken, url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.error?.status ||
      "Google Business request failed.";

    throw new Error(message);
  }

  return data;
}

export async function listGoogleBusinessLocations(accessToken) {
  const accountsData = await googleFetch(
    accessToken,
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
  );

  const accounts = accountsData.accounts || [];

  const locationsByAccount = await Promise.all(
    accounts.map(async (account) => {
      const locationsData = await googleFetch(
        accessToken,
        `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title,storeCode,websiteUri,primaryCategory,locationKey,metadata`
      );

      return (locationsData.locations || []).map((location) => ({
        id: location.name,
        accountName: account.accountName || account.name,
        accountId: account.name,
        name:
          location.title ||
          location.locationKey?.placeId ||
          location.name,
        type:
          location.primaryCategory?.displayName ||
          location.primaryCategory?.name ||
          "Business",
        primaryCategory:
          location.primaryCategory?.displayName ||
          location.primaryCategory?.name ||
          "Business",
        placeId: location.locationKey?.placeId || "",
      }));
    })
  );

  return locationsByAccount.flat();
}

export async function getAllowedLocationSelection(session) {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(ALLOWED_LOCATION_COOKIE)?.value;
  const selection = parseSelection(rawValue);

  if (!selection || selection.userEmail !== session.user.email) {
    return null;
  }

  return selection;
}

export function setAllowedLocationSelection(response, session, location) {
  response.cookies.set(ALLOWED_LOCATION_COOKIE, serializeSelection({
    userEmail: session.user.email,
    locationId: location.id,
    locationName: location.name,
    locationType: location.type,
    locationCategory: location.primaryCategory,
    locationCity: location.accountName,
    accountId: location.accountId || "",
    savedAt: new Date().toISOString(),
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAllowedLocationSelection(response) {
  response.cookies.delete(ALLOWED_LOCATION_COOKIE);
}
