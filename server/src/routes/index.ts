import { Router } from "express";
import { Alert } from "../entities/Alert";

const router = Router();

router.get("/alerts", async (req, res) => {
  const alerts = await Alert.find();
  res.json({ info: "API Alerts", alerts });
});

//  Fallback Route
router.get("/", (req, res) => {
  res.json({ info: "API Endpoint" });
});

export default router;
