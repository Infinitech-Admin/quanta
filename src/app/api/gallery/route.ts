// app/api/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";

export async function GET(request: NextRequest) {
  try {
    const { search } = new URL(request.url); // forwards ?category=... if present
    const res = await fetch(`${getApiUrl()}/api/gallery${search}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 }, // public data — cache briefly instead of no-store
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

async function forwardJson(res: Response) {
  const raw = await res.text();
  try {
    const data = JSON.parse(raw);
    return NextResponse.json(data, { status: res.status });
  } catch {
    console.error("Non-JSON response from Laravel:", res.status, raw);
    return NextResponse.json(
      { success: false, message: "Backend returned an invalid response." },
      { status: 502 },
    );
  }
}
