import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function googleFetch(accessToken, url) {
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

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("replyo_gbp_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Google Business is not connected yet." },
      { status: 401 }
    );
  }

  try {
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

    return NextResponse.json({
      locations: locationsByAccount.flat(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load Google Business locations.";

    return NextResponse.json(
      {
        error: message,
        help:
          "If quota is 0 or access is restricted, Google Business Profile API access may still need approval in your project.",
      },
      { status: 500 }
    );
  }
}
