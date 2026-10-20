import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/googleReviews";

/** Toujours dynamiques : lit la clé .env à chaque requête (cache Google 6 h via fetch) */
export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await fetchGoogleReviews();
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control":
        payload.source === "live"
          ? "public, s-maxage=21600, stale-while-revalidate=86400"
          : "no-store",
    },
  });
}
