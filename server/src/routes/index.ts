import { Router } from "express";
import { IsAuth } from "../middleware/Auth";
import AlertRoute from "./alertRoute";
import UserRoute from "./userRoute";

const router = Router();

router.use("/user", UserRoute);

router.use("/alert", IsAuth, AlertRoute);

//  Fallback Route
router.get("/", (req, res) => {
  res.json({ info: "API Endpoint" });
});

export default router;
