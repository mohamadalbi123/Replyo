const BUSINESS_TYPE_GUIDANCE = {
  restaurant: {
    label: "Restaurant",
    voice: "warm, hospitality-first, and appreciative",
    focus: "food quality, service, atmosphere, timing, and welcoming guests back",
  },
  "beauty salon": {
    label: "Beauty Salon",
    voice: "personal, polished, caring, and confidence-building",
    focus: "care, comfort, results, team warmth, cleanliness, and the overall experience",
  },
  "retail shop": {
    label: "Retail Shop",
    voice: "friendly, helpful, and product-aware",
    focus: "service, product quality, store experience, and convenience",
  },
  default: {
    label: "Local Business",
    voice: "warm, professional, and concise",
    focus: "service quality, appreciation, and a clear invitation to return",
  },
};

const POSITIVE_TERMS = [
  "amazing",
  "great",
  "excellent",
  "friendly",
  "clean",
  "helpful",
  "love",
  "loved",
  "perfect",
  "wonderful",
];

const NEGATIVE_TERMS = [
  "bad",
  "terrible",
  "slow",
  "wait",
  "late",
  "rude",
  "dirty",
  "cold",
  "disappointed",
  "awful",
];

const TOPIC_RULES = [
  { topic: "staff friendliness", terms: ["friendly", "kind", "staff", "team", "welcomed"] },
  { topic: "cleanliness", terms: ["clean", "spotless", "hygiene", "tidy"] },
  { topic: "waiting time", terms: ["wait", "waiting", "late", "delay"] },
  { topic: "service quality", terms: ["service", "experience", "professional", "helpful"] },
  { topic: "food quality", terms: ["food", "dish", "meal", "delicious", "taste"] },
  { topic: "results", terms: ["haircut", "nails", "color", "result", "look"] },
  { topic: "atmosphere", terms: ["atmosphere", "ambience", "place", "comfortable"] },
];

export function normalizeBusinessType(businessType) {
  return (businessType || "").trim().toLowerCase();
}

export function getBusinessTypeGuidance(businessType) {
  const normalizedType = normalizeBusinessType(businessType);
  return BUSINESS_TYPE_GUIDANCE[normalizedType] || BUSINESS_TYPE_GUIDANCE.default;
}

export function inferReviewContext({ review, rating, businessType }) {
  const text = (review || "").toLowerCase();
  const detectedTopics = TOPIC_RULES.filter(({ terms }) =>
    terms.some((term) => text.includes(term))
  ).map(({ topic }) => topic);

  const positiveHits = POSITIVE_TERMS.filter((term) => text.includes(term)).length;
  const negativeHits = NEGATIVE_TERMS.filter((term) => text.includes(term)).length;

  let sentiment = "neutral";

  if ((rating || 0) >= 4 || positiveHits > negativeHits) {
    sentiment = "positive";
  }

  if ((rating || 0) <= 2 || negativeHits > positiveHits) {
    sentiment = "negative";
  }

  if ((rating || 0) === 3 && positiveHits === negativeHits) {
    sentiment = "mixed";
  }

  const guidance = getBusinessTypeGuidance(businessType);

  return {
    sentiment,
    detectedTopics: detectedTopics.length ? detectedTopics : ["overall experience"],
    businessLabel: guidance.label,
    voice: guidance.voice,
    focus: guidance.focus,
  };
}

export function buildReplyPromptContext({
  review,
  rating,
  businessType,
  businessName,
  tone,
}) {
  const context = inferReviewContext({ review, rating, businessType });

  return {
    ...context,
    businessName: businessName || "the business",
    rating: rating || null,
    tone: tone || "Warm, professional, and concise",
  };
}

export function buildSystemPrompt(promptContext) {
  return [
    "You write short, natural, professional replies to Google reviews for local businesses.",
    `Business type: ${promptContext.businessLabel}.`,
    `Business voice: ${promptContext.voice}.`,
    `Focus areas: ${promptContext.focus}.`,
    `Brand tone preference: ${promptContext.tone}.`,
    `Review sentiment: ${promptContext.sentiment}.`,
    `Main topics in the review: ${promptContext.detectedTopics.join(", ")}.`,
    "Keep the reply under 80 words, sound human, and avoid exaggerated marketing language.",
    "If the review is negative, acknowledge the issue calmly and professionally without sounding defensive.",
  ].join(" ");
}

export function buildUserPrompt(promptContext, review) {
  const ratingLine = promptContext.rating
    ? `Star rating: ${promptContext.rating}/5.`
    : "";

  return [
    `Write a reply for ${promptContext.businessName}.`,
    ratingLine,
    `Customer review: ${review}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildFallbackReply({
  review,
  rating,
  businessType,
  businessName,
}) {
  const context = buildReplyPromptContext({
    review,
    rating,
    businessType,
    businessName,
  });

  const name = businessName || "our team";
  const topics = context.detectedTopics.join(" and ");

  if (context.sentiment === "negative") {
    return `Thank you for your feedback. We are sorry your experience with ${name} did not fully meet expectations. Your comments about ${topics} are important to us, and we will use them to improve.`;
  }

  if (context.sentiment === "positive") {
    return `Thank you so much for your kind review. We are delighted to hear you appreciated ${topics}, and we truly appreciate your support. We look forward to welcoming you again soon.`;
  }

  return `Thank you for sharing your feedback. We appreciate your comments about ${topics}, and your review helps ${name} keep improving the experience for every guest.`;
}
