require("dotenv-safe/config");
import express from "express";
import http from "http";
import { applyMiddleare } from "./middleware";
import routes from "./routes";
import SocketHandler from "./SocketHandler";

const app = express();
const server = http.createServer(app);

const PORT: number = parseInt(process.env.PORT) || 5000;

applyMiddleare(app);
SocketHandler(server);

app.use(routes);

server.listen(PORT, async () => {
  console.log("Server is now running");
});
