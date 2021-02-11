import { User } from "./entities";

declare module "express-session" {
  interface SessionData {
    _user?: User;
  }
}
