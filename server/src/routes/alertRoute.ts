import { Router } from "express";
import { MoreThan } from "typeorm";
import { Alert } from "../entities/Alert";
import { UserRoles } from "../entities/User";
import { IsAuth } from "../middleware/Auth";

const router = Router();

// Pagination ? Coming Soon ?
router.get("/", IsAuth, async (req, res) => {
  const { adminDash } = req.body;
  let alerts: Alert[] = [];
  if (req.session._user?.role === UserRoles.ADMIN && adminDash) {
    alerts = await Alert.find({
      order: {
        timeStamp: "DESC",
      },
      take: 100,
      cache: {
        id: "admin_alerts",
        milliseconds: 30000,
      },
    });
  } else {
    //  User account may only view  up to 2 days.
    const date = new Date();
    date.setDate(date.getDate() - 2);

    alerts = await Alert.find({
      order: {
        timeStamp: "DESC",
      },
      take: 100,
      where: {
        timeStamp: MoreThan(date.toISOString()),
      },
      cache: {
        id: "user_alerts",
        milliseconds: 30000,
      },
    });
  }
  return res.json({ info: "API Alerts", success: true, alerts });
});

export default router;
