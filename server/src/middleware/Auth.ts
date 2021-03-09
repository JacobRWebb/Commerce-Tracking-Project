import Express, { Request } from "express";
import { decode, verify } from "jsonwebtoken";
import { User } from "../entities";

const Auth = {
  nonLogged: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const check = await checkAuth(req);
    if (!check) {
      return next();
    }
    return res.status(403).json({ info: "Not allowed to enter route." });
  },
  IsAuth: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const check = await checkAuth(req);
    if (check instanceof User) {
      res._User = check;
      return next();
    }

    return res.status(401).json({
      info: "Token mismatch",
    });
  },
};

const checkAuth = async (req: Request): Promise<boolean | User> => {
  try {
    if (req.cookies["token"]) {
      const token: string = req.cookies["token"];
      const token_decode = decode(token);
      if (typeof token_decode === "object" && token_decode !== null) {
        const user = await User.findOne({ where: { id: token_decode["id"] } });
        if (user) {
          const result = verify(
            token,
            `${process.env.JWT_SECRET}-${user.lastLogout}`
          );
          if (typeof result === "object") {
            return user;
          }
        }
      }
    }
  } catch {}

  return false;
};

export default Auth;
