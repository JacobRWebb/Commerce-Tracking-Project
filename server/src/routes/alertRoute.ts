import { Router } from "express";
import { AlertController } from "../controllers";
import { Alert } from "../entities";
import { IsAuth } from "../middleware/Auth";

const router = Router();

router.post("/", IsAuth, async (req, res) => {
  const { role } = req.session._user!;
  const { perPage = 100 } = req.body;
  const alertResponse: [Alert[], number] | void = await AlertController.getAll(
    role,
    req.body
  );
  if (!alertResponse) {
    return res.json({ success: false });
  }
  return res.json({
    success: true,
    alerts: alertResponse[0],
    count: alertResponse[1],
    perPage,
  });
});

router.post("/submit", async (req, res) => {
  res.json({ info: "Submitted", success: true }).status(200).end();
});

export default router;
