import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  postActivity,
  getUserActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
  getAllActivities,
} from "../controllers/activity.controller.js";
import activityUpload from "../middlewares/activityUp.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getUserActivities);
router.post("/", verifyToken,  activityUpload, postActivity);
router.patch("/:id", verifyToken, activityUpload, updateActivityById);
router.delete("/:id", verifyToken, deleteActivityById);
router.get("/:id", verifyToken, verifyAdmin, getActivityById);
router.get("/all", verifyToken, verifyAdmin, getAllActivities);

export default router;
