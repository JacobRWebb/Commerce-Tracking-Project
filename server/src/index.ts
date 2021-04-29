require("dotenv-safe/config");
import express from "express";
import { getConnection } from "typeorm";
import { establishConnection } from "./entities";
import { applyMiddleware, preMiddleware } from "./middleware";
import routes from "./routes";
import { IsProd, NODE_ENV } from "./util/constants";
import Generator from "./util/Generator";
const app = express();
const PORT: number = parseInt(process.env.PORT) || 5000;

const main = async () => {
  await establishConnection();
  app.use("*", (_req, res, next) => {
    if (!getConnection().isConnected)
      return res.json({ success: false, api: true });

    return next();
  });
};

main()
  .then(async () => {
    applyMiddleware(preMiddleware, app);
    app.use(routes);

    //  Spin up mock data generator.
    if (!IsProd) {
      const generator = new Generator();
      await generator.base();
    }

    app.listen(PORT, () => {
      console.log(
        `\nServer is running in ${NODE_ENV} mode.\n\nhttp://localhost:${PORT}/\n\n`
      );
    });
  })
  .catch(() => {});
