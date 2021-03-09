import { User } from "src/entities";

declare global {
  namespace Express {
    interface Response {
      _User?: User;
    }
  }
}
