export const isProd = process.env.NODE_ENV === "production";

export const API_DOMAIN = isProd
  ? "https://api.xodius.io"
  : "http://localhost:5050";

export const WS_DOMAIN = isProd ? "wss://api.xodius.io" : "ws://localhost:5050";
