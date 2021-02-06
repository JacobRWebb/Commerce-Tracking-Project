import { Router } from "express";
import { AlertController } from "../controllers";
import { Alert } from "../entities";

const router = Router();

router.post("/", async (req, res) => {
  const { role } = req.session._user!;
  const alertResponse:
    | [Alert[], number]
    | boolean = await AlertController.getAll(role, req.body);

  return res.json({
    success: true,
    alerts: alertResponse[0],
    count: alertResponse[1],
    perPage: 100,
  });
});

router.post("/submit", async (req, res) => {
  res.json({ info: "Submitted", success: true }).status(200).end();
});

export default router;
