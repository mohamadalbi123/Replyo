export const REVIEWS_STORAGE_KEY = "replyo-dashboard-reviews";
export const SETTINGS_STORAGE_KEY = "replyo-settings";
export const CONNECTION_STORAGE_KEY = "replyo-google-connection";
export const BILLING_STORAGE_KEY = "replyo-billing";

export const demoLocations = [
  {
    id: "loc-1",
    name: "Studio Lumiere",
    type: "Beauty Salon",
    city: "La Rochelle",
    primaryCategory: "beauty salon",
    tone: "Polished, caring, and personal",
  },
  {
    id: "loc-2",
    name: "Chez Albi Bistro",
    type: "Restaurant",
    city: "Lyon",
    primaryCategory: "restaurant",
    tone: "Warm, hospitable, and appetizing",
  },
  {
    id: "loc-3",
    name: "Replyo Corner Shop",
    type: "Retail Shop",
    city: "Marseille",
    primaryCategory: "retail shop",
    tone: "Helpful, upbeat, and practical",
  },
];

export const defaultSettings = {
  replyMode: "approval",
  tone: "",
  alertsEnabled: true,
  notificationEmail: "",
  smartPersonalization: true,
};

export const defaultConnection = {
  isConnected: false,
  provider: "Google Business Profile",
  selectedLocationId: "",
  selectedLocationName: "",
  selectedLocationType: "",
  selectedLocationCategory: "",
  selectedLocationCity: "",
  syncedAt: "",
};

export const defaultBilling = {
  status: "inactive",
  planId: "",
  planName: "",
  amountLabel: "",
  cadence: "",
  nextBillingDate: "",
  selectedAt: "",
  locationLimit: 0,
  paymentBrand: "",
  cardLast4: "",
  cardExpiry: "",
};

export const defaultReviews = [
  {
    id: "review-1",
    customerName: "Marie Dupont",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 5,
    reviewText:
      "Amazing service, very friendly staff, and the salon was spotless. I will definitely come back.",
    replyText:
      "Thank you so much for your lovely review. We are delighted to hear you enjoyed your visit and felt welcomed by the team. We look forward to seeing you again very soon.",
    source: "openai",
    status: "ready",
    detectedTopics: ["staff friendliness", "cleanliness"],
    detectedSentiment: "positive",
    createdAt: "2026-04-01T10:00:00.000Z",
    postedAt: "",
  },
  {
    id: "review-2",
    customerName: "Karim N.",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 4,
    reviewText:
      "Very good experience overall. The team was kind and professional, just a bit of waiting before my appointment.",
    replyText:
      "Thank you for your feedback and for your kind words about the team. We are happy you had a good experience, and we will keep working to improve waiting times.",
    source: "openai",
    status: "ready",
    detectedTopics: ["staff friendliness", "waiting time"],
    detectedSentiment: "positive",
    createdAt: "2026-04-02T12:30:00.000Z",
    postedAt: "",
  },
  {
    id: "review-3",
    customerName: "Sofia L.",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 5,
    reviewText:
      "Loved the atmosphere and the haircut. Thank you for making me feel welcome.",
    replyText:
      "Thank you for your kind review. We are so happy you enjoyed the atmosphere and your haircut, and we truly appreciate your warm feedback.",
    source: "openai",
    status: "ready",
    detectedTopics: ["results", "atmosphere"],
    detectedSentiment: "positive",
    createdAt: "2026-04-03T08:20:00.000Z",
    postedAt: "",
  },
  {
    id: "review-4",
    customerName: "Nadia M.",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 4,
    reviewText:
      "Very happy with the result. The team was welcoming and the salon felt calm and professional from start to finish.",
    replyText:
      "Thank you so much for your kind review. We are delighted you felt welcomed and enjoyed the result of your visit. We truly appreciate your trust and look forward to seeing you again soon.",
    source: "openai",
    status: "ready",
    detectedTopics: ["results", "staff friendliness", "atmosphere"],
    detectedSentiment: "positive",
    createdAt: "2026-04-03T11:10:00.000Z",
    postedAt: "",
  },
  {
    id: "review-5",
    customerName: "Claire B.",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 5,
    reviewText:
      "Lovely experience overall. Clean space, friendly staff, and I really appreciated how carefully everything was explained to me.",
    replyText:
      "Thank you for your wonderful feedback. We are so pleased you enjoyed the atmosphere and felt well looked after by the team. We appreciate your visit and hope to welcome you back very soon.",
    source: "openai",
    status: "ready",
    detectedTopics: ["cleanliness", "staff friendliness", "service quality"],
    detectedSentiment: "positive",
    createdAt: "2026-04-03T14:40:00.000Z",
    postedAt: "",
  },
  {
    id: "review-6",
    customerName: "Emma R.",
    businessName: "Studio Lumiere",
    businessType: "Beauty Salon",
    rating: 4,
    reviewText:
      "Professional team and a very relaxing atmosphere. I had to wait a few minutes, but the final result was worth it.",
    replyText:
      "Thank you for your thoughtful review. We are happy you enjoyed the atmosphere and your final result, and we also appreciate your patience regarding the short wait. We hope to see you again soon.",
    source: "openai",
    status: "ready",
    detectedTopics: ["waiting time", "results", "atmosphere"],
    detectedSentiment: "positive",
    createdAt: "2026-04-04T09:15:00.000Z",
    postedAt: "",
  },
];

const sampleReviewsByCategory = {
  "beauty salon": [
    {
      customerName: "Marie Dupont",
      rating: 5,
      reviewText:
        "Amazing service, very friendly staff, and the salon was spotless. I will definitely come back.",
      replyText:
        "Thank you so much for your lovely review. We are delighted to hear you enjoyed your visit and felt welcomed by the team. We look forward to seeing you again very soon.",
      source: "openai",
      status: "ready",
      detectedTopics: ["staff friendliness", "cleanliness"],
      detectedSentiment: "positive",
      createdAt: "2026-04-01T10:00:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Karim N.",
      rating: 4,
      reviewText:
        "Very good experience overall. The team was kind and professional, just a bit of waiting before my appointment.",
      replyText:
        "Thank you for your feedback and for your kind words about the team. We are happy you had a good experience, and we will keep working to improve waiting times.",
      source: "openai",
      status: "ready",
      detectedTopics: ["staff friendliness", "waiting time"],
      detectedSentiment: "positive",
      createdAt: "2026-04-02T12:30:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Sofia L.",
      rating: 5,
      reviewText: "Loved the atmosphere and the haircut. Thank you for making me feel welcome.",
      replyText:
        "Thank you for your kind review. We are so happy you enjoyed the atmosphere and your haircut, and we truly appreciate your warm feedback.",
      source: "openai",
      status: "ready",
      detectedTopics: ["results", "atmosphere"],
      detectedSentiment: "positive",
      createdAt: "2026-04-03T08:20:00.000Z",
      postedAt: "",
    },
  ],
  restaurant: [
    {
      customerName: "Thomas R.",
      rating: 5,
      reviewText:
        "Delicious food, warm welcome, and the service was fast even though the restaurant was busy.",
      replyText:
        "Thank you so much for your kind review. We are delighted you enjoyed the food and service, and we truly appreciate your visit. We hope to welcome you back again soon.",
      source: "openai",
      status: "ready",
      detectedTopics: ["food quality", "service quality"],
      detectedSentiment: "positive",
      createdAt: "2026-04-01T19:00:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Leila B.",
      rating: 3,
      reviewText:
        "The meal was good and the team was nice, but we had to wait too long before getting a table.",
      replyText:
        "Thank you for your feedback. We are pleased you enjoyed the meal and our team, and we also appreciate your comments about the wait. We will keep working to improve the pace of service.",
      source: "openai",
      status: "ready",
      detectedTopics: ["food quality", "waiting time", "staff friendliness"],
      detectedSentiment: "mixed",
      createdAt: "2026-04-02T20:15:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Nadia M.",
      rating: 2,
      reviewText: "Staff were polite but the food arrived late and was cold.",
      replyText:
        "Thank you for your feedback. We appreciate your kind words about the staff and are sorry the food arrived late and cold. We are reviewing this with the team to improve the experience.",
      source: "openai",
      status: "ready",
      detectedTopics: ["service quality", "waiting time", "food quality"],
      detectedSentiment: "negative",
      createdAt: "2026-04-03T12:05:00.000Z",
      postedAt: "",
    },
  ],
  "retail shop": [
    {
      customerName: "Samira A.",
      rating: 5,
      reviewText:
        "Lovely shop, very helpful team, and I found exactly what I needed right away.",
      replyText:
        "Thank you so much for your review. We are delighted you found what you needed and enjoyed the service from our team. We hope to see you again soon.",
      source: "openai",
      status: "ready",
      detectedTopics: ["service quality"],
      detectedSentiment: "positive",
      createdAt: "2026-04-01T15:20:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Ethan P.",
      rating: 4,
      reviewText:
        "Great selection and friendly service. Checkout was a little slow but overall a good visit.",
      replyText:
        "Thank you for your feedback. We are glad you enjoyed the selection and service, and we appreciate your note about checkout speed as we keep improving the experience.",
      source: "openai",
      status: "ready",
      detectedTopics: ["service quality", "waiting time"],
      detectedSentiment: "positive",
      createdAt: "2026-04-02T11:40:00.000Z",
      postedAt: "",
    },
    {
      customerName: "Alicia V.",
      rating: 2,
      reviewText: "The staff was kind, but the product I wanted was out of stock again.",
      replyText:
        "Thank you for your feedback. We appreciate your kind words about the team and understand the frustration around product availability. We are working to improve stock consistency.",
      source: "openai",
      status: "ready",
      detectedTopics: ["service quality", "overall experience"],
      detectedSentiment: "negative",
      createdAt: "2026-04-03T09:00:00.000Z",
      postedAt: "",
    },
  ],
};

export function createDemoReviewsForLocation(location) {
  const category = location?.primaryCategory || "beauty salon";
  const baseReviews = sampleReviewsByCategory[category] || sampleReviewsByCategory["beauty salon"];

  return baseReviews.map((review, index) => ({
    ...review,
    id: `${location.id}-review-${index + 1}`,
    businessName: location.name,
    businessType: location.type,
  }));
}

export function readStoredValue(key, fallbackValue) {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Failed to read ${key}:`, error);
    return fallbackValue;
  }
}

export function writeStoredValue(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
