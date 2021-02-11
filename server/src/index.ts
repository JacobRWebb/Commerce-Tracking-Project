require("dotenv-safe/config");
import express from "express";
import { establishConnection } from "./entities";
import { applyMiddleware, preMiddleware } from "./middleware";
import routes from "./routes";
import { DataGenerator } from "./util";
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
      const dataGenerator = new DataGenerator();
      dataGenerator.demo();
      console.log(`Server is running.\nhttp://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));
