require("dotenv-safe/config");
import { TypeormStore } from "connect-typeorm/out";
import cors from "cors";
import express from "express";
import session from "express-session";
import { createConnection, getConnection } from "typeorm";
import { Session } from "./entities/Session";
import routes from "./routes";
import FakeData from "./util/FakeData";

const app = express();
const PORT: number = parseInt(process.env.PORT);

const main = async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  await generate();
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  app.use(
    session({
      name: "sid",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({ cleanupLimit: 2, ttl: 86400 }).connect(
        getConnection().getRepository(Session)
      ),
    })
  );

  app.use(routes);

  app.listen(PORT, () => {
    console.log(`Server is running.\nhttp://localhost:${PORT}/`);
  });
};

main().catch((err) => {
  console.error(err);
});

const generate = async () => {
  await FakeData.generateUsers(10);
  await FakeData.generateAlerts(400);
};
