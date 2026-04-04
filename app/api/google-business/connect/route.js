import { NextResponse } from "next/server";

function getBaseUrl(request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const nextAuthUrl = process.env.NEXTAUTH_URL;

  if (nextAuthUrl) {
    return nextAuthUrl;
  }

  return request.nextUrl.origin;
}

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(new URL("/connect-google?error=missing_google_client", request.url));
  }

  const baseUrl = getBaseUrl(request);
  const redirectUri = `${baseUrl}/api/google-business/callback`;
  const state = crypto.randomUUID();

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set(
    "scope",
    "openid email profile https://www.googleapis.com/auth/business.manage"
  );
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent select_account");
  authUrl.searchParams.set("include_granted_scopes", "false");
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("replyo_gbp_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  return response;
}
