import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Response {
      user?: User;
    }
  }
}
