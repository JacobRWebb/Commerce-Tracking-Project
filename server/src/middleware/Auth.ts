import Express from "express";

const Auth = {
  IsAuth: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (!req.session._user) return res.json({ success: false, nonAuth: true });
    return next();
  },
};

export default Auth;
