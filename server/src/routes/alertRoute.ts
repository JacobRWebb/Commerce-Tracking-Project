import { Router } from "express";
import { AlertController } from "../controllers";
import { Auth } from "../middleware";

const router = Router();

export interface IExpectedAlertList {
  filter?: 0 | 1 | 2;
  extended: boolean;
  meta?: {
    rowsPerPage: number;
    offset: number;
  };
}

router.post("/", Auth.IsAuth, async (req, res) => {
  //  This will never be called but typescript can't understand middleware checking.
  if (!req.session._user) return res.json({ success: false });
  const {
    filter = 2,
    extended = false,
    meta: { rowsPerPage = 50, offset = 0 },
  } = req.body;

  const alerts = await AlertController.fetchAll(
    req.session._user,
    filter,
    extended,
    rowsPerPage,
    offset
  );

  if (!alerts) return res.json({ success: false });

  return res.json({
    success: true,
    alerts: alerts[0],
    count: alerts[1],
    rowsPerPage,
  });
});

// router.post("/", IsAuth, async (req, res) => {
//   const { role } = req.session._user!;
//   const {
//     filter = 2,
//     extended = false,
//     meta = { rowsPerPage: 50, offset: 0 },
//   }: IExpectedAlertList = req.body;
//   const alertResponse: [Alert[], number] | void = await AlertController.getAll(
//     role,
//     filter,
//     meta,
//     extended
//   );
//   if (!alertResponse) {
//     return res.json({ success: false });
//   }
//   return res.json({
//     success: true,
//     alerts: alertResponse[0],
//     count: alertResponse[1],
//     rowsPerPage: meta.rowsPerPage,
//   });
// });

// router.post("/edit", IsAuth, async (req, res) => {
//   const { newState = 0, comment = "", id = undefined } = req.body;
//   console.log(req.body);
//   const alert = await AlertController.editAlert(id, req.session._user, {
//     comment,
//     newState,
//   });
//   res.json({ success: true, body: req.body, alert });
// });

export default router;
