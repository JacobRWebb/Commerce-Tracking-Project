import { Router } from "express";
import { MoreThan } from "typeorm";
import { Alert } from "../entities/Alert";

const router = Router();

router.get("/alerts", async (req, res) => {
  const date = new Date();
  date.setDate(date.getDate() - 2);

  const alerts = await Alert.find({
    order: {
      timeStamp: "DESC",
    },
    take: 100,
    where: {
      timeStamp: MoreThan(date.toISOString()),
    },
  });
  res.json({ info: "API Alerts", alerts });
});

//  Fallback Route
router.get("/", (req, res) => {
  res.json({ info: "API Endpoint" });
});

export default router;
