// lib/forward-json.ts
import { NextResponse } from "next/server";

// Reads the body as text first so a non-JSON response from Laravel
// (stray warning, HTML error page) is logged instead of throwing.
export async function forwardJson(res: Response) {
  const raw = await res.text();
  try {
    return NextResponse.json(JSON.parse(raw), { status: res.status });
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
