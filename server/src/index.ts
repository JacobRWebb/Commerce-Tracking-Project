import express from "express";
import http from "http";
import { applyMiddleare } from "./middleware";
import routes from "./routes";
import SocketHandler from "./SocketHandler";
import { seedDB } from "./util/Generator";

const app = express();
const server = http.createServer(app);

const PORT: number = parseInt(process.env.API_PORT) || 5000;

applyMiddleare(app);
SocketHandler(server);

app.use(routes);

server.listen(PORT, async () => {
  console.log("Server is now running");
  if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV !== "production") {
      seedDB();
    }
  }
});
