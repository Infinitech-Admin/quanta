export function getApiUrl() {
  return process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
}
