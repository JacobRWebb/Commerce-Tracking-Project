import Express, { Request } from "express";
import { decode, verify } from "jsonwebtoken";
import { getConnection } from "typeorm";
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
        const connection = getConnection();
        const x = await connection
          .getRepository(User)
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.applications", "applications")
          .where("user.id = :id", { id: token_decode["id"] })
          .getOne()
          .catch((err) => console.error(err));

        //const user = await User.findOne({ where: { id: token_decode["id"] } });
        if (x) {
          const result = verify(
            token,
            `${process.env.JWT_SECRET}-${x.lastLogout}`
          );
          if (typeof result === "object") {
            return x;
          }
        }
      }
    }
  } catch {}

  return false;
};

export default Auth;
