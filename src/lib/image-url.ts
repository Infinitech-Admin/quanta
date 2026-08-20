// Laravel returns relative paths for uploaded images, e.g. "/brands/kami.png"
// (see BrandController::uploadImage, which saves straight to public/ and
// returns "/" + folder + "/" + filename). Those paths are only valid on the
// Laravel origin, not the Next.js one, so anywhere we render an uploaded
// image we need to prefix it with where Laravel is actually served.
//
// Set this in .env.local:
//   NEXT_PUBLIC_IMAGE_URL=http://localhost:8000
// In production this should be your real API/asset domain.
const IMAGE_BASE_URL = (process.env.NEXT_PUBLIC_IMAGE_URL ?? "").replace(
  /\/$/,
  "",
);

/**
 * Resolves a possibly-relative image path to a fully-qualified URL.
 * - Already-absolute URLs (http/https) and blob: previews pass through
 *   unchanged.
 * - null/empty stays null, so callers can keep using it directly in
 *   conditionals like `{value && <img src={getImageUrl(value)} />}`.
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  return `${IMAGE_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
