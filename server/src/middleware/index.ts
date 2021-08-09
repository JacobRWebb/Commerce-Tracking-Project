import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
export const applyMiddleare = (app: Router) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(helmet());
  let domain =
    process.env.NODE_ENV === "production"
      ? "https://www.xodius.io"
      : "localhost:3000";
  app.use(
    cors({
      credentials: true,
      origin: domain,
    })
  );
};
