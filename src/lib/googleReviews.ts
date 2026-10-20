import { googleRating, reviews as fallbackReviews } from "@/data/reviews";
import type { Review } from "@/data/reviews";

export type ReviewsPayload = {
  score: number;
  count: number;
  mapsUrl: string;
  reviews: Review[];
  /** "live" = Places API · "fallback" = données locales */
  source: "live" | "fallback";
  fetchedAt: string;
};

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  publishTime?: string;
  authorAttribution?: { displayName?: string };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

type TextSearchResponse = {
  places?: Array<{ id?: string }>;
};

const SEARCH_QUERY = "La Toscane 65 Rue Saint-Jean 88300 Neufchâteau";

export function getFallbackPayload(): ReviewsPayload {
  return {
    score: googleRating.score,
    count: googleRating.count,
    mapsUrl: googleRating.mapsUrl,
    reviews: fallbackReviews,
    source: "fallback",
    fetchedAt: new Date().toISOString(),
  };
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const fromEnv = process.env.GOOGLE_PLACE_ID?.trim();
  if (fromEnv) return fromEnv;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({
      textQuery: SEARCH_QUERY,
      languageCode: "fr",
      maxResultCount: 1,
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    console.error("[googleReviews] searchText failed", res.status, await res.text());
    return null;
  }

  const data = (await res.json()) as TextSearchResponse;
  return data.places?.[0]?.id ?? null;
}

function mapReviews(place: PlaceDetails): Review[] {
  const list = place.reviews ?? [];
  return list
    .filter((r) => r.text?.text?.trim())
    .slice(0, 5)
    .map((r, index) => {
      const original = r.text!.text!.trim();
      const date = r.publishTime
        ? r.publishTime.slice(0, 10)
        : new Date().toISOString().slice(0, 10);
      return {
        id: `live-${index}-${date}`,
        author: r.authorAttribution?.displayName?.trim() || "Client Google",
        rating: Math.min(5, Math.max(1, Math.round(r.rating ?? 5))),
        date,
        source: "google" as const,
        text: { fr: original, en: original },
      };
    });
}

/** Appel Places API (New) — note, volume d’avis, jusqu’à 5 avis */
export async function fetchGoogleReviews(): Promise<ReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    return getFallbackPayload();
  }

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) {
      return getFallbackPayload();
    }

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews,googleMapsUri,displayName",
        },
        next: { revalidate: 21600 },
      },
    );

    if (!res.ok) {
      console.error("[googleReviews] details failed", res.status, await res.text());
      return getFallbackPayload();
    }

    const place = (await res.json()) as PlaceDetails;
    const liveReviews = mapReviews(place);

    return {
      score: place.rating ?? googleRating.score,
      count: place.userRatingCount ?? googleRating.count,
      mapsUrl: place.googleMapsUri ?? googleRating.mapsUrl,
      reviews: liveReviews.length > 0 ? liveReviews : fallbackReviews,
      source: "live",
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[googleReviews] unexpected error", error);
    return getFallbackPayload();
  }
}
