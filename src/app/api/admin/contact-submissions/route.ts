import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";
import { authHeaders } from "@/lib/auth-headers";

export async function GET() {
  try {
    const headers = await authHeaders();
    const res = await fetch(`${getApiUrl()}/api/admin/contact-submissions`, {
      headers: { Accept: "application/json", ...headers },
      cache: "no-store",
    });
    return await forwardJson(res);
  } catch (error) {
    console.error("GET /api/admin/contact-submissions error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

// Reads the body as text first so a malformed/non-JSON response from
// Laravel (a stray warning, HTML error page, etc.) can be logged and
// surfaced instead of throwing an opaque JSON.parse error.
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
