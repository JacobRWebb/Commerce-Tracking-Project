import { Router } from "express";
import { AlertController } from "../controllers";
import { Alert } from "../entities";
import { Auth } from "../middleware";

const router = Router();

router.post("/get", Auth.IsAuth, async (req, res) => {
  const { alertId } = req.body;
  const alert = await Alert.findOne({ where: { id: alertId } });
  if (!alert) return res.json({ success: false });

  return res.json({
    success: true,
    alert,
  });
});

router.post("/", Auth.IsAuth, async (req, res) => {
  if (!res._User?.role) return res.json({ success: false });
  const alertResponse = await AlertController.fetchAll(
    req.body,
    res._User.role
  );
  if (!alertResponse) return res.json({ success: false });
  return res.json({
    success: true,
    alerts: alertResponse[0],
    count: alertResponse[1],
  });
});

export default router;
