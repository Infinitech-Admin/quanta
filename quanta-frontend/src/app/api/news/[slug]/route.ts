// app/api/news/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { forwardJson } from "@/lib/forward-json";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const res = await fetch(
      `${getApiUrl()}/api/news/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/news/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
