import bodyParser from "body-parser";
import { TypeormStore } from "connect-typeorm/out";
import cors from "cors";
import { Router } from "express";
import session from "express-session";
import { getConnection } from "typeorm";
import { Session } from "../entities";

export const corsHandler = (router: Router) =>
  router.use(cors({ credentials: true, origin: "http://localhost:3000" }));

export const bodyHandler = (router: Router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

export const sessionHandler = (router: Router) => {
  router.use(
    session({
      name: "sessionID",
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      },
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({ cleanupLimit: 1, ttl: 86400 }).connect(
        getConnection().getRepository(Session)
      ),
    })
  );
};
