// src/app/api/admin/institutional-products/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function POST(request: NextRequest) {
  try {
    const headers = await authHeaders();
    const formData = await request.formData();

    const res = await fetch(
      `${getApiUrl()}/api/admin/institutional-products/upload`,
      {
        method: "POST",
        headers: { Accept: "application/json", ...headers },
        body: formData,
      },
    );
    return await forwardJson(res);
  } catch (error) {
    console.error(
      "POST /api/admin/institutional-products/upload error:",
      error,
    );
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
