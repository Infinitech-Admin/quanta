import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_URL = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

export async function GET() {
  const upstream = `${API_URL}/group-companies`;

  try {
    const res = await fetch(upstream, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const text = await res.text();

    if (!res.ok) {
      // Temporary: remove `upstream` once this is working.
      return NextResponse.json(
        { message: "Upstream request failed", upstream, status: res.status },
        { status: res.status },
      );
    }

    // Stored image URLs may still point at localhost; swap in the real API origin.
    const origin = new URL(API_URL).origin;
    const fixed = JSON.stringify(JSON.parse(text)).replace(
      /https?:\/\/localhost:8000/g,
      origin,
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
