import { Router } from "express";
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity
} from "../controllers/activity.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createActivity);
router.get("/:subject_id", verifyToken, getActivities);
router.put("/:id", verifyToken, updateActivity);
router.delete("/:id", verifyToken, deleteActivity);

export default router;