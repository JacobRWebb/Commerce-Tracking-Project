import { User } from "../../entities";

declare global {
  namespace Express {
    interface Response {
      _User?: User;
      connected: boolean;
    }
  }
}
