import cookParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";

export const corsHandler = (router: Router) =>
  router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

export const jsonHandler = (router: Router) => router.use(express.json());

export const bodyHandler = (router: Router) =>
  router.use(express.urlencoded({ extended: true }));

export const cookieParser = (router: Router) => router.use(cookParser());
