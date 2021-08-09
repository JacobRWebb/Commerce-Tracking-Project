import { PrismaClient, User } from "@prisma/client";
import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import EntryController from "./controllers/EntryController";
import UserController from "./controllers/UserController";
import { userFromToken } from "./util/Basic";

export interface ExtSocket extends Socket {
  user?: User;
}

export enum EntryMethods {
  REQUEST = "request_comments",
  COMMENT_RESPONSE = "comment_response",
  COMMENT_DELETED = "comment_deleted",
  COMMENT_ADDED = "comment_added",
  STATUS_CHANGE = "status_change",
}

export interface ISocketEntry {
  METHOD: EntryMethods;
  data: {
    entryId: string;
    userToken: string;
    newComment?: string;
    commentId?: string;
  };
}

export interface IEntryResponse {
  METHOD: EntryMethods;
  data: {
    entryId: string;
    comments?: IComment[];
  };
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
    socket.on(
      "entry",
      async ({ ...args }) => await handleEntry(args, socket, io)
    );
    socket.on("token-check", async (args) => {
      const token = args.token || "";
      const user = await UserController.userFromToken(token);
      return socket.emit("token-response", { user });
    });
  });

  return io;
};

export interface IComment {
  id: string;
  comment: string;
  user: {
    username: string;
  };
  createdAt: Date;
}

const prisma = new PrismaClient();

const handleEntry = async (
  args: ISocketEntry,
  socket: ExtSocket,
  io: Server
) => {
  const user = await userFromToken(args.data.userToken);
  if (!user) {
    socket.emit("auth", { error: true });
    return;
  }

  const response: IEntryResponse = {
    data: { entryId: args.data.entryId },
    METHOD: EntryMethods.REQUEST,
  };

  switch (args.METHOD) {
    case EntryMethods.REQUEST:
      const comments = await EntryController.fetchComments(args.data.entryId);
      response.METHOD = EntryMethods.COMMENT_RESPONSE;
      response.data = { ...response.data, comments: comments };
      socket.emit(args.data.entryId, response);
      break;
    case EntryMethods.STATUS_CHANGE:
      break;
    case EntryMethods.COMMENT_ADDED:
      if (args.data.newComment) {
        //  @TODO Serializations and validation of incoming variables.
        await prisma.comment.create({
          data: {
            comment: args.data.newComment,
            alertId: args.data.entryId,
            userId: user.id,
          },
          include: { user: { select: { username: true } } },
        });

        const comments = await EntryController.fetchComments(args.data.entryId);

        response.METHOD = EntryMethods.COMMENT_RESPONSE;
        response.data = { ...response.data, comments };
        io.emit(args.data.entryId, response);
      }
      break;
    case EntryMethods.COMMENT_DELETED:
      if (args.data.commentId) {
        await prisma.comment.delete({
          where: { id: args.data.commentId },
        });
        const comments = await EntryController.fetchComments(args.data.entryId);
        response.METHOD = EntryMethods.COMMENT_RESPONSE;
        response.data = { ...response.data, comments: comments };
        io.emit(args.data.entryId, response);
      }

      break;
    default:
      break;
  }
};

export default SocketHandler;
