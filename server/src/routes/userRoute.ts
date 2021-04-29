import { Response, Router } from "express";
import { UserController } from "../controllers";
import { Auth } from "../middleware";

const router = Router();

router.get("/", Auth.IsAuth, (_req, res: Response) => {
  res.json({ ...res._User });
});

router.post("/login", Auth.nonLogged, async (req, res) => {
  let { username, password } = req.body;

  const check = await UserController.login(username, password);

  if (check) {
    const { token, user } = check;
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      user,
    });
  }

  return res
    .status(400)
    .json({ error: "Unable to find account matching credentials!" });
});

router.all("/logout", Auth.IsAuth, async (_req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expires: new Date(), maxAge: 0 })
    .json({});
});

export default router;
