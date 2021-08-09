import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hashString, userFromToken } from "../util/Basic";
const prisma = new PrismaClient();

const UserController = {
  userFromToken: async (token: string): Promise<User | null> => {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      if (verify) {
        const userId = (verify as { userId: string }).userId;
        if (userId) {
          const user = await prisma.user.findFirst({ where: { id: userId } });
          return user;
        }
      }
    } catch {}

    return null;
  },
  tokenizeUser: (user: User) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  },
  login: async (username: string, password: string) => {
    const hash = hashString(password);

    const user = await prisma.user.findFirst({
      where: { username, password: hash },
    });

    return user;
  },
  checkToken: async (token: string) => {
    const user = userFromToken(token);
    return user;
  },
};

export default UserController;
