import { Router } from "express";
import { MoreThan, Timestamp } from "typeorm";
import { Alert } from "../entities/Alert";
import { UserRoles } from "../entities/User";
import { IsAuth } from "../middleware/Auth";

const router = Router();

router.get("/", IsAuth, async (req, res) => {
  const { adminDash } = req.body;
  let alerts: Alert[] = [];
  if (req.session._user?.role === UserRoles.ADMIN && adminDash) {
    alerts = await Alert.find({
      order: {
        timestamp: "DESC",
      },
      take: 200,
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
      where: {
        timestamp: MoreThan(date.toISOString()),
      },
      order: {
        timestamp: "DESC",
      },
      take: 200,
      cache: {
        id: "user_alerts",
        milliseconds: 30000,
      },
    });
  }
  return res.json({ info: "API Alerts", success: true, alerts });
});

interface IExpectedAlert {
  timestamp: Timestamp;
  hostname: string;
  application_id: string;
  file: string;
  change_agent: string;
  change_process: string;
}

router.post("/", async (req, res) => {
  //  Ignoring authentication & Validation
  console.log(req.body);
  let {
    application_id,
    timestamp,
    change_agent,
    change_process,
    file,
    hostname,
  }: IExpectedAlert = req.body;

  const alert = Alert.create({
    change_agent,
    change_process,
    file,
    hostname,
    timestamp,
  });

  await alert.save();

  res.status(200).end();
});

export default router;
