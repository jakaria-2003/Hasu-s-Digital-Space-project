// Central API configuration for local and live production deployment
// On Vercel / Production, empty string makes fetch use relative URL e.g. /api/contacts
export const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "");
