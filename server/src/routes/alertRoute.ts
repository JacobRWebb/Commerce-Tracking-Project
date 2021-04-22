import { Router } from "express";
import { AlertController } from "../controllers";
import { Auth } from "../middleware";

const router = Router();

router.post("/get", Auth.IsAuth, async (req, res) => {
  if (!res._User) return res.status(401).end();

  const id: string = req.body.id || undefined;

  const alert = await AlertController.getOne(res._User, id);

  if (!alert) return res.status(400).end();

  return res.json({ entry: alert });
});

router.post("/update", Auth.IsAuth, async (req, res) => {
  if (!res._User) return res.status(401).end();

  const change = await AlertController.update(res._User, req.body);

  return res.json({ change });
});

router.post("/", Auth.IsAuth, async (req, res) => {
  if (!res._User) return res.json({ success: false });
  const alertResponse = await AlertController.getAll(res._User, req.body);
  if (!alertResponse) return res.json({ success: false });

  return res.json({
    success: true,
    alerts: alertResponse[0],
    count: alertResponse[1],
  });
});

export default router;
