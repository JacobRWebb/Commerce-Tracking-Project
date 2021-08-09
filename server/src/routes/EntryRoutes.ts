import { Router } from "express";
import EntryController, { IFilter } from "../controllers/EntryController";
import { userFromToken } from "../util/Basic";

const router = Router();

router.post("/", async (req, res) => {
  const inboundFilter: Partial<IFilter> = req.body.filter || {};
  const token = req.cookies.token || req.body.token || undefined;
  const user = await userFromToken(token);

  if (!user) {
    return res.json({ entries: [], count: 0 });
  }
  const entriesWithCount = await EntryController.getAll(user, inboundFilter);

  return res.json(entriesWithCount);
});

export default router;
