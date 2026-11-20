import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function GET(request: NextRequest) {
  try {
    const headers = await authHeaders();
    const limit = request.nextUrl.searchParams.get("limit") ?? "8";
    const res = await fetch(
      `${getApiUrl()}/api/admin/dashboard/recent-activity?limit=${encodeURIComponent(limit)}`,
      {
        headers: { Accept: "application/json", ...headers },
        cache: "no-store",
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/admin/dashboard/recent-activity error:", error);
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
