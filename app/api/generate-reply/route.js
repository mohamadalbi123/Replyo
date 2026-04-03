import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  buildFallbackReply,
  buildReplyPromptContext,
  buildSystemPrompt,
  buildUserPrompt,
} from "../../lib/replyStrategy";

export async function POST(request) {
  try {
    const {
      review,
      rating,
      businessType,
      businessName,
      tone,
      smartPersonalization = true,
    } = await request.json();

    if (!review || !review.trim()) {
      return NextResponse.json(
        { error: "No review provided" },
        { status: 400 }
      );
    }

    const promptContext = buildReplyPromptContext({
      review,
      rating,
      businessType: smartPersonalization ? businessType : "",
      businessName: smartPersonalization ? businessName : "",
      tone,
    });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: buildFallbackReply({
          review,
          rating,
          businessType: smartPersonalization ? businessType : "",
          businessName: smartPersonalization ? businessName : "",
        }),
        source: "fallback",
        context: promptContext,
      });
    }

    try {
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(promptContext),
          },
          {
            role: "user",
            content: buildUserPrompt(promptContext, review),
          },
        ],
        temperature: 0.8,
      });

      const reply =
        completion.choices?.[0]?.message?.content?.trim() ||
        buildFallbackReply({
          review,
          rating,
          businessType: smartPersonalization ? businessType : "",
          businessName: smartPersonalization ? businessName : "",
        });

      return NextResponse.json({ reply, source: "openai", context: promptContext });
    } catch (error) {
      console.error("OpenAI route error:", error);
      return NextResponse.json({
        reply: buildFallbackReply({
          review,
          rating,
          businessType: smartPersonalization ? businessType : "",
          businessName: smartPersonalization ? businessName : "",
        }),
        source: "fallback",
        context: promptContext,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while generating reply" },
      { status: 500 }
    );
  }
}
