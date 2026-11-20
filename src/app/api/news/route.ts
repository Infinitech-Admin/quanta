// app/api/news/route.ts
import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { forwardJson } from "@/lib/forward-json";

export async function GET() {
  try {
    const res = await fetch(`${getApiUrl()}/api/news`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
