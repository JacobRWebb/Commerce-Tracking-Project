import { Router } from "express";
import { bodyHandler, cookieParser, corsHandler, jsonHandler } from "./primary";

type middleware = (router: Router) => void;

export const applyMiddleware = (middleware: middleware[], router: Router) => {
  middleware.forEach((middleware) => middleware(router));
};

export const preMiddleware = [
  corsHandler,
  bodyHandler,
  cookieParser,
  jsonHandler,
];

export { default as Auth } from "./Auth";
