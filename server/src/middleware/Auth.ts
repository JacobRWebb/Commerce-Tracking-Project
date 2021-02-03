import Express from "express";

export const IsAuth = async (
  req: Express.Request,
  res: Express.Response,
  next: () => void
) => {
  if (!req.session._user) return res.json({ auth: false });
  return next();
};
