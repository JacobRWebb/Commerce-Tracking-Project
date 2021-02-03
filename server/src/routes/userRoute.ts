import { Router } from "express";
import { User } from "../entities/User";
import { IsAuth } from "../middleware/Auth";

const router = Router();

declare module "express-session" {
  interface SessionData {
    _user?: User;
  }
}

router.get("/", IsAuth, (req, res) => {
  res.json({ reqUser: req.session._user });
});

router.post("/login", async (req, res) => {
  //  Willingly Ignoring input Validation...
  let { username, password } = req.body;
  let user = await User.findOne({ where: { username, password } });
  if (!user) return res.json({ success: false, user, username, password });
  req.session._user = user;
  return res.json({ success: true, reqUser: req.session._user, user });
});

router.all("/logout", async (req, res) => {
  req.session.destroy(() => {});
  res.json({ success: true });
});

export default router;
