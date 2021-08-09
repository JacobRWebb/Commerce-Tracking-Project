export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: string;
      JWT_SECRET: string;
      NODE_ENV: "development" | "production";
    }
  }
}
