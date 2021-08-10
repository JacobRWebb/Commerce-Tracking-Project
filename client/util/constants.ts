export const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://api.xodius.io"
    : "http://localhost:5050";

export const WS_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "ws://api.xodius.io"
    : "ws://localhost:5050";
