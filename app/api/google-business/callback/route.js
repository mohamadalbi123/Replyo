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
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("replyo_gbp_state")?.value;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/connect-google?error=invalid_google_business_state", request.url));
  }

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/connect-google?error=missing_google_business_credentials", request.url));
  }

  const baseUrl = getBaseUrl(request);
  const redirectUri = `${baseUrl}/api/google-business/callback`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json().catch(() => ({}));

  if (!tokenResponse.ok || !tokenData.access_token) {
    return NextResponse.redirect(new URL("/connect-google?error=google_business_token_failed", request.url));
  }

  const response = NextResponse.redirect(new URL("/connect-google?google_business=connected", request.url));
  response.cookies.set("replyo_gbp_access_token", tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.max((tokenData.expires_in || 3600) - 60, 300),
  });

  if (tokenData.refresh_token) {
    response.cookies.set("replyo_gbp_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  response.cookies.delete("replyo_gbp_state");
  return response;
}
