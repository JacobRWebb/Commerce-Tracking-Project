import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import UserController from "../controllers/UserController";
const router = Router();

router.post("/logout", async (_req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).end();
});

router.post("/check", async (req, res) => {
  const token = req.body.token || req.cookies.token || undefined;
  if (token) {
    const user = await UserController.userFromToken(token);
    if (user) {
      return res
        .status(200)
        .json({ id: user.id, username: user.username, role: user.role })
        .end();
    }
  }

  return res.status(400).json({ info: "Bad Token" });
});

router.post("/token", [body("token")], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const token = req.body.token;

  const user = await UserController.checkToken(token);
  if (user) {
    console.log("Serverside-user-token");
    console.log(token);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 12 * 24 * 60 * 10,
        secure: true,
        domain: "xodius.io",
      })
      .json({ token, user: { username: user.username, role: user.role } });
  }

  return res
    .status(400)
    .json({ errors: [{ msg: "Token Mismatch", param: "Server" }] })
    .end();
});

router.post(
  "/login",
  [
    body("username").isLength({ min: 3, max: 30 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }

    const { username = "", password = "" } = req.body as {
      username: string;
      password: string;
    };
    const user = await UserController.login(username, password);

    if (user) {
      const token = UserController.tokenizeUser(user);
      console.log("Serverside-tokenize-token");
      console.log(token);
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 12 * 24 * 60 * 10,
          secure: true,
          domain: "xodius.io",
        })
        .json({ token, user: { username: user.username, role: user.role } });
    }

    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid credentials", param: "Server" }] })
      .end();
  }
);
export default router;
