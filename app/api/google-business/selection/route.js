import { NextResponse } from "next/server";
import {
  clearAllowedLocationSelection,
  getAllowedLocationSelection,
  getGoogleBusinessAccessToken,
  listGoogleBusinessLocations,
  requireReplyoSession,
  setAllowedLocationSelection,
} from "../../../lib/googleBusinessServer";

export async function GET() {
  const session = await requireReplyoSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    selection: await getAllowedLocationSelection(session),
  });
}

export async function POST(request) {
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

  const { locationId } = await request.json().catch(() => ({}));

  if (!locationId) {
    return NextResponse.json({ error: "Missing locationId." }, { status: 400 });
  }

  const existingSelection = await getAllowedLocationSelection(session);

  if (existingSelection && existingSelection.locationId !== locationId) {
    return NextResponse.json(
      {
        error:
          "This subscription is already restricted to one saved location. Disconnect it first before choosing another.",
      },
      { status: 403 }
    );
  }

  try {
    const locations = await listGoogleBusinessLocations(accessToken);
    const selectedLocation = locations.find((location) => location.id === locationId);

    if (!selectedLocation) {
      return NextResponse.json(
        { error: "That location is not available in the connected Google account." },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      selection: {
        locationId: selectedLocation.id,
        locationName: selectedLocation.name,
        locationType: selectedLocation.type,
        locationCategory: selectedLocation.primaryCategory,
        locationCity: selectedLocation.accountName,
        accountId: selectedLocation.accountId,
      },
    });

    setAllowedLocationSelection(response, session, selectedLocation);
    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not save the selected Google Business location.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await requireReplyoSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  clearAllowedLocationSelection(response);
  return response;
}
