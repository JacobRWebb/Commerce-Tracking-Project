require("dotenv-safe/config");
import express from "express";
import { establishConnection } from "./entities";
import { applyMiddleware, preMiddleware } from "./middleware";
import routes from "./routes";
import { generate } from "./util";
const app = express();
const PORT: number = parseInt(process.env.PORT) || 5000;

const main = async () => {
  await establishConnection();
};

main()
  .then(() => {
    applyMiddleware(preMiddleware, app);
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`\nServer is running.\nhttp://localhost:${PORT}/\n`);
    });

    generate();
  })
  .catch((err) => console.log(err));
