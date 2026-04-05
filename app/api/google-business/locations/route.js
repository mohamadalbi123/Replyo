import { NextResponse } from "next/server";
import {
  getAllowedLocationSelection,
  getGoogleBusinessAccessToken,
  listGoogleBusinessLocations,
  requireReplyoSession,
} from "../../../lib/googleBusinessServer";

export async function GET() {
  const session = await requireReplyoSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = await getGoogleBusinessAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Google Business is not connected yet." },
      { status: 401 }
    );
  }

  try {
    const allLocations = await listGoogleBusinessLocations(accessToken);
    const allowedSelection = await getAllowedLocationSelection(session);
    const locations = allowedSelection
      ? allLocations.filter((location) => location.id === allowedSelection.locationId)
      : allLocations;

    return NextResponse.json({
      locations,
      lockedToLocation: Boolean(allowedSelection),
      allowedLocationId: allowedSelection?.locationId || "",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to load Google Business locations.";

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
