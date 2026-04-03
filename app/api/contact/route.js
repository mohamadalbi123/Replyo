import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, businessName, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and message." },
        { status: 400 }
      );
    }

    console.log("Replyo contact form submission", {
      name: name.trim(),
      email: email.trim(),
      businessName: businessName?.trim() || "",
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thanks. Your message has been received.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
