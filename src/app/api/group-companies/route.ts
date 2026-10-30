import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Bare origin, no trailing slash and no /api/v1.
const BASE_URL = (process.env.LARAVEL_API_URL ?? "http://localhost:8000")
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");

export async function GET() {
  const upstream = `${BASE_URL}/api/v1/group-companies`;

  try {
    const res = await fetch(upstream, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { message: "Upstream request failed", upstream, status: res.status },
        { status: res.status },
      );
    }

    // Stored image URLs may still point at localhost; swap in the real API origin.
    const fixed = JSON.stringify(JSON.parse(text)).replace(
      /https?:\/\/localhost:8000/g,
      BASE_URL,
    );

    return new NextResponse(fixed, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach the API", upstream },
      { status: 502 },
    );
  }
}
