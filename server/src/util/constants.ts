require("dotenv-safe/config");

export const NODE_ENV = process.env.NODE_ENV || "development";

export const IsProd = NODE_ENV === "production";
