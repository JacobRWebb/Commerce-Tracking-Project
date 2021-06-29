import { Router } from "express";
import EntryController from "../controllers/EntryController";

const router = Router();

router.post("/", async (_req, res) => {
  const entries = await EntryController.getAll();

  return res.json({ entries: entries });
});

export default router;
