import { Router } from "express";
import EntryRoutes from "./EntryRoutes";
import UserRoutes from "./UserRoutes";
const router = Router();

router.use("/entry", EntryRoutes);
router.use("/user", UserRoutes);

router.get("/", (_req, res) => {
  res.json({ info: "API Endpoint" });
});

export default router;
