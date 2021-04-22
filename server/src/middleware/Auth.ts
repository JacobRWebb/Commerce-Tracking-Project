import Express, { Request } from "express";
import jwt from "jsonwebtoken";
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

    return res.status(401).end();
  },
};

const checkAuth = async (req: Request): Promise<boolean | User> => {
  let found: boolean | User = false;
  try {
    if (req.cookies["token"]) {
      const token: string = req.cookies["token"];

      const decoded = jwt.decode(token);

      const user = await User.findOne({
        where: { id: (decoded as { id: string }).id },
        relations: ["applications"],
      });

      jwt.verify(token, process.env.JWT_SECRET, (err, _decoded) => {
        if (err) return false;
        if (user) found = user;
        return;
      });
    }
  } catch {}

  return found;
};

export default Auth;
