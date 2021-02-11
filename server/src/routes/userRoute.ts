import { Router } from "express";
import { UserController } from "../controllers";
import { Auth } from "../middleware";

const router = Router();

router.get("/", Auth.IsAuth, (req, res) => {
  res.json({ success: true, user: req.session._user });
});

router.post("/login", async (req, res) => {
  //  [TODO] Setup Validation, Ignoring for now.
  let { username, password } = req.body;

  const user = await UserController.login(username, password);

  if (user) {
    req.session._user = user;
    return res.json({ success: true, user });
  }

  return res.json({
    success: false,
    info: "Unable to find user account with those details",
  });
});

router.all("/logout", async (req, res) => {
  req.session.destroy(() => {});
  res.json({ success: true });
});

export default router;
