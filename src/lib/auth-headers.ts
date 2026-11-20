import { cookies } from "next/headers";

/** Reads the httpOnly auth_token cookie set by /api/auth/login and turns
 *  it into an Authorization header for the Laravel API. */
export async function authHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
