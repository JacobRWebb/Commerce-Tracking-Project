import { Router } from "express";
import { AlertController } from "../controllers";
import { Alert } from "../entities";
import { IsAuth } from "../middleware/Auth";

const router = Router();

export interface IExpectedAlertList {
  filter?: 0 | 1 | 2;
  extended: boolean;
  meta?: {
    rowsPerPage: number;
    offset: number;
  };
}

router.post("/", IsAuth, async (req, res) => {
  const { role } = req.session._user!;
  const {
    filter = 2,
    extended = false,
    meta = { rowsPerPage: 50, offset: 0 },
  }: IExpectedAlertList = req.body;
  const alertResponse: [Alert[], number] | void = await AlertController.getAll(
    role,
    filter,
    meta,
    extended
  );
  if (!alertResponse) {
    return res.json({ success: false });
  }
  return res.json({
    success: true,
    alerts: alertResponse[0],
    count: alertResponse[1],
    rowsPerPage: meta.rowsPerPage,
  });
});

router.post("/submit", async (req, res) => {
  res.json({ info: "Submitted", success: true }).status(200).end();
});

export default router;
