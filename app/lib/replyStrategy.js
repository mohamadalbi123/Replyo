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
  "good",
  "best",
  "friendly",
  "clean",
  "helpful",
  "love",
  "loved",
  "perfect",
  "wonderful",
  "bien",
  "tres bien",
  "genial",
  "bueno",
  "muy bueno",
  "gut",
  "toll",
  "super",
  "رائع",
  "رائعة",
  "ممتاز",
  "ممتازة",
  "لذيذ",
  "لذيذة",
  "جميل",
  "جميلة",
  "ودود",
  "لطيف",
  "لطيفة",
  "نظيف",
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
  "poor",
  "mauvais",
  "lent",
  "sale",
  "impoli",
  "malo",
  "lento",
  "sucio",
  "grosero",
  "schlecht",
  "langsam",
  "kalt",
  "unfreundlich",
  "سيء",
  "سيئة",
  "بارد",
  "بطيء",
  "وقح",
  "قذر",
];

const NEGATION_PATTERNS = [
  "not",
  "never",
  "no",
  "isn't",
  "wasn't",
  "weren't",
  "don't",
  "didn't",
  "can't",
  "pas",
  "ne",
  "nicht",
  "kein",
  "keine",
  "لا",
  "ليس",
  "مو",
  "مش",
];

const TOPIC_RULES = [
  {
    topic: "staff friendliness",
    terms: ["friendly", "kind", "staff", "team", "welcomed", "فريق", "الفريق", "طاقم", "لطيف", "لطيفة", "ودود"],
  },
  { topic: "cleanliness", terms: ["clean", "spotless", "hygiene", "tidy", "نظيف", "نظيفة", "نظيفا", "نظيفة جدا"] },
  { topic: "waiting time", terms: ["wait", "waiting", "late", "delay", "انتظار", "تأخير", "متأخر", "بطيء"] },
  { topic: "service quality", terms: ["service", "experience", "professional", "helpful", "خدمة", "الخدمة", "تجربة", "مساعدة"] },
  { topic: "food quality", terms: ["food", "dish", "meal", "delicious", "taste", "طعام", "الطعام", "أكل", "اكل", "وجبة", "لذيذ", "لذيذة"] },
  { topic: "results", terms: ["haircut", "nails", "color", "result", "look", "نتيجة", "النتيجة", "لون", "قصة"] },
  { topic: "atmosphere", terms: ["atmosphere", "ambience", "place", "comfortable", "مكان", "المكان", "أجواء", "اجواء", "مريح"] },
];

const TOPIC_LABELS = {
  English: {
    "staff friendliness": "staff friendliness",
    cleanliness: "cleanliness",
    "waiting time": "waiting time",
    "service quality": "service quality",
    "food quality": "food quality",
    results: "results",
    atmosphere: "atmosphere",
    "overall experience": "overall experience",
  },
  French: {
    "staff friendliness": "l'accueil de l'equipe",
    cleanliness: "la proprete",
    "waiting time": "le temps d'attente",
    "service quality": "la qualite du service",
    "food quality": "la qualite de la cuisine",
    results: "le resultat",
    atmosphere: "l'ambiance",
    "overall experience": "l'experience globale",
  },
  Arabic: {
    "staff friendliness": "لطف الفريق",
    cleanliness: "النظافة",
    "waiting time": "وقت الانتظار",
    "service quality": "جودة الخدمة",
    "food quality": "جودة الطعام",
    results: "النتيجة",
    atmosphere: "الأجواء",
    "overall experience": "التجربة العامة",
  },
  Spanish: {
    "staff friendliness": "la amabilidad del equipo",
    cleanliness: "la limpieza",
    "waiting time": "el tiempo de espera",
    "service quality": "la calidad del servicio",
    "food quality": "la calidad de la comida",
    results: "el resultado",
    atmosphere: "el ambiente",
    "overall experience": "la experiencia general",
  },
  German: {
    "staff friendliness": "die Freundlichkeit des Teams",
    cleanliness: "die Sauberkeit",
    "waiting time": "die Wartezeit",
    "service quality": "die Servicequalitaet",
    "food quality": "die Qualitaet des Essens",
    results: "das Ergebnis",
    atmosphere: "die Atmosphaere",
    "overall experience": "das Gesamterlebnis",
  },
};

const LANGUAGE_HINTS = {
  English: [
    "the",
    "and",
    "was",
    "were",
    "very",
    "thank",
    "service",
    "food",
    "staff",
    "place",
    "overall",
  ],
  French: [
    "merci",
    "très",
    "tres",
    "équipe",
    "equipe",
    "accueil",
    "propre",
    "service",
    "salon",
    "expérience",
    "experience",
  ],
  German: [
    "sehr",
    "danke",
    "freundlich",
    "sauber",
    "essen",
    "bewertung",
    "wunderbar",
    "wirklich",
    "besuch",
    "teamarbeit",
  ],
  Spanish: [
    "gracias",
    "muy",
    "amable",
    "equipo",
    "servicio",
    "comida",
    "lugar",
    "experiencia",
    "todo",
    "bueno",
  ],
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasStandaloneTerm(text, term) {
  return new RegExp(
    `(^|[^\\p{L}])${escapeRegExp(term)}(?=$|[^\\p{L}])`,
    "iu"
  ).test(text);
}

function hasNegatedTerm(text, term) {
  return NEGATION_PATTERNS.some((negation) =>
    new RegExp(
      `(^|[^\\p{L}])${escapeRegExp(negation)}\\s+${escapeRegExp(term)}(?=$|[^\\p{L}])`,
      "iu"
    ).test(text)
  );
}

function countTermMatches(text, terms) {
  return terms.reduce((count, term) => {
    return count + (hasStandaloneTerm(text, term) ? 1 : 0);
  }, 0);
}

function detectReplyLanguage(review = "") {
  const text = review.trim();
  const lowered = text.toLowerCase();

  if (/[\u0600-\u06FF]/.test(text)) {
    return "Arabic";
  }

  if (/[\u4E00-\u9FFF]/.test(text)) {
    return "Chinese";
  }

  const scores = {
    English: countTermMatches(lowered, LANGUAGE_HINTS.English),
    French: countTermMatches(lowered, LANGUAGE_HINTS.French),
    German: countTermMatches(lowered, LANGUAGE_HINTS.German),
    Spanish: countTermMatches(lowered, LANGUAGE_HINTS.Spanish),
  };

  if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) {
    scores.French += 3;
  }

  if (/[äöüß]/i.test(text)) {
    scores.German += 3;
  }

  if (/[ñáéíóú]/i.test(text)) {
    scores.Spanish += 3;
  }

  const rankedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [bestLanguage, bestScore] = rankedScores[0];
  const secondScore = rankedScores[1]?.[1] || 0;

  if (bestScore >= 2 && bestScore >= secondScore + 1) {
    return bestLanguage;
  }

  return "English";
}

export function normalizeBusinessType(businessType) {
  return (businessType || "").trim().toLowerCase();
}

export function getBusinessTypeGuidance(businessType) {
  const normalizedType = normalizeBusinessType(businessType);
  return BUSINESS_TYPE_GUIDANCE[normalizedType] || BUSINESS_TYPE_GUIDANCE.default;
}

export function inferReviewContext({ review, rating, businessType }) {
  const text = (review || "").toLowerCase();
  const hasNumericRating = typeof rating === "number" && Number.isFinite(rating);
  const detectedTopics = TOPIC_RULES.filter(({ terms }) =>
    terms.some((term) => hasStandaloneTerm(text, term))
  ).map(({ topic }) => topic);

  const positiveHits =
    POSITIVE_TERMS.reduce((count, term) => {
      return count + (hasStandaloneTerm(text, term) && !hasNegatedTerm(text, term) ? 1 : 0);
    }, 0) +
    NEGATIVE_TERMS.reduce((count, term) => {
      return count + (hasNegatedTerm(text, term) ? 1 : 0);
    }, 0);

  const negativeHits =
    NEGATIVE_TERMS.reduce((count, term) => {
      return count + (hasStandaloneTerm(text, term) && !hasNegatedTerm(text, term) ? 1 : 0);
    }, 0) +
    POSITIVE_TERMS.reduce((count, term) => {
      return count + (hasNegatedTerm(text, term) ? 1 : 0);
    }, 0);

  let sentiment = "neutral";

  if ((hasNumericRating && rating >= 4) || positiveHits > negativeHits) {
    sentiment = "positive";
  }

  if ((hasNumericRating && rating <= 2) || negativeHits > positiveHits) {
    sentiment = "negative";
  }

  if (hasNumericRating && rating === 3 && positiveHits === negativeHits) {
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
    replyLanguage: detectReplyLanguage(review),
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
    `Fallback detected language: ${promptContext.replyLanguage}.`,
    "Determine the dominant language of the full customer review before writing the reply.",
    "Reply in the dominant language when one language clearly represents most of the review, even if the review contains mixed-language phrases.",
    "Do not switch the reply language because of a few borrowed words like team, nice, hello, merci, or similar cross-language terms.",
    "Preserve the full meaning of the review, including important details written in minority-language phrases.",
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

  const hasBusinessName = Boolean(businessName && businessName.trim());
  const name = hasBusinessName ? businessName.trim() : "";
  const localizedTopicLabels =
    TOPIC_LABELS[context.replyLanguage] || TOPIC_LABELS.English;
  const topicJoiners = {
    Arabic: " و",
    French: " et ",
    Spanish: " y ",
    German: " und ",
    English: " and ",
  };
  const topics = context.detectedTopics
    .map((topic) => localizedTopicLabels[topic] || topic)
    .join(topicJoiners[context.replyLanguage] || topicJoiners.English);

  if (context.replyLanguage === "French") {
    if (context.sentiment === "negative") {
      return hasBusinessName
        ? `Merci pour votre retour. Nous sommes desoles que votre experience avec ${name} n'ait pas ete a la hauteur. Vos remarques sur ${topics} sont importantes et nous aideront a nous ameliorer.`
        : `Merci pour votre retour. Nous sommes desoles que votre experience n'ait pas ete a la hauteur. Vos remarques sur ${topics} sont importantes et nous aideront a nous ameliorer.`;
    }

    if (context.sentiment === "positive") {
      return `Merci beaucoup pour votre avis. Nous sommes ravis de voir que vous avez apprecie ${topics}. Votre soutien compte beaucoup pour nous et nous esperons vous revoir tres bientot.`;
    }

    return `Merci d'avoir partage votre avis. Nous apprecions vos remarques sur ${topics}, et elles nous aident a ameliorer l'experience de chaque client.`;
  }

  if (context.replyLanguage === "Arabic") {
    if (context.sentiment === "negative") {
      return hasBusinessName
        ? `شكرا على ملاحظاتك. نأسف لان تجربتك مع ${name} لم تكن كما يجب. ملاحظاتك حول ${topics} مهمة لنا وستساعدنا على التحسن.`
        : `شكرا على ملاحظاتك. نأسف لان تجربتك لم تكن كما يجب. ملاحظاتك حول ${topics} مهمة لنا وستساعدنا على التحسن.`;
    }

    if (context.sentiment === "positive") {
      return `شكرا جزيلا على تقييمك الجميل. يسعدنا جدا انك قدرت ${topics}، ونشكرك على دعمك. نتطلع لاستقبالك مرة اخرى قريبا.`;
    }

    return `شكرا على مشاركة رأيك. نحن نقدر ملاحظاتك حول ${topics}، وهي تساعدنا على تحسين التجربة لكل عميل.`;
  }

  if (context.replyLanguage === "Spanish") {
    if (context.sentiment === "negative") {
      return hasBusinessName
        ? `Gracias por tu comentario. Lamentamos que tu experiencia con ${name} no haya cumplido tus expectativas. Tus observaciones sobre ${topics} son importantes y nos ayudaran a mejorar.`
        : `Gracias por tu comentario. Lamentamos que tu experiencia no haya cumplido tus expectativas. Tus observaciones sobre ${topics} son importantes y nos ayudaran a mejorar.`;
    }

    if (context.sentiment === "positive") {
      return `Muchas gracias por tu resena. Nos alegra saber que valoraste ${topics}. Agradecemos mucho tu apoyo y esperamos darte la bienvenida de nuevo muy pronto.`;
    }

    return `Gracias por compartir tu opinion. Valoramos tus comentarios sobre ${topics}, y nos ayudan a seguir mejorando la experiencia para cada cliente.`;
  }

  if (context.replyLanguage === "German") {
    if (context.sentiment === "negative") {
      return hasBusinessName
        ? `Vielen Dank fuer Ihr Feedback. Es tut uns leid, dass Ihre Erfahrung mit ${name} nicht Ihren Erwartungen entsprochen hat. Ihre Hinweise zu ${topics} sind wichtig fuer uns und helfen uns, besser zu werden.`
        : `Vielen Dank fuer Ihr Feedback. Es tut uns leid, dass Ihre Erfahrung nicht Ihren Erwartungen entsprochen hat. Ihre Hinweise zu ${topics} sind wichtig fuer uns und helfen uns, besser zu werden.`;
    }

    if (context.sentiment === "positive") {
      return `Vielen Dank fuer Ihre freundliche Bewertung. Wir freuen uns sehr, dass Ihnen ${topics} gefallen haben. Ihre Unterstuetzung bedeutet uns viel und wir freuen uns auf Ihren naechsten Besuch.`;
    }

    return `Vielen Dank, dass Sie Ihre Erfahrung geteilt haben. Ihre Hinweise zu ${topics} helfen ${name}, das Erlebnis fuer alle Gaeste weiter zu verbessern.`;
  }

  if (context.sentiment === "negative") {
    return hasBusinessName
      ? `Thank you for your feedback. We are sorry your experience with ${name} did not fully meet expectations. Your comments about ${topics} are important to us, and we will use them to improve.`
      : `Thank you for your feedback. We are sorry your experience did not fully meet expectations. Your comments about ${topics} are important to us, and we will use them to improve.`;
  }

  if (context.sentiment === "positive") {
    return `Thank you so much for your kind review. We are delighted to hear you appreciated ${topics}, and we truly appreciate your support. We look forward to welcoming you again soon.`;
  }

  return hasBusinessName
    ? `Thank you for sharing your feedback. We appreciate your comments about ${topics}, and your review helps ${name} keep improving the experience for every client.`
    : `Thank you for sharing your feedback. We appreciate your comments about ${topics}, and your review helps us keep improving the experience for every client.`;
}
