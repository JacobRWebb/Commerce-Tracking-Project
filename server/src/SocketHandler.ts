import { User } from "@prisma/client";
import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import UserController from "./controllers/UserController";

export interface ExtSocket extends Socket {
  user?: User;
}

const SocketHandler = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.on("connection", async (socket: ExtSocket) => {
    console.log(socket.id);

    socket.on("token-check", async (args) => {
      const token = args.token || "";
      const user = await UserController.userFromToken(token);
      return socket.emit("token-response", { user });
    });
  });

  return io;
};

export default SocketHandler;
