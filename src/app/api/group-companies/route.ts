import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";

export async function GET() {
  try {
    const res = await fetch(`${getApiUrl()}/api/group-companies`, {
      headers: { Accept: "application/json" },
      // public marketing content — safe to cache briefly instead of no-store
      next: { revalidate: 60 },
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/group-companies error:", error);
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
      {
        success: false,
        message: "Backend returned an invalid response.",
        debug: raw.slice(0, 2000),
      },
      { status: 502 },
    );
  }
}
