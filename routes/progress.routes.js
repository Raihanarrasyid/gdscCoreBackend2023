import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  postProgress,
  getAllProgress,
  getUserProgress,
  getProgressById,
  updateProgressById,
  deleteProgressById,
} from "../controllers/progress.controller.js";

const router = express.Router();

router.get("/", verifyToken, getUserProgress);
router.post("/", verifyToken, postProgress);
router.patch("/:id", verifyToken, updateProgressById);
router.delete("/:id", verifyToken, deleteProgressById);
router.get("/:id", verifyToken, verifyAdmin, getProgressById);
router.get("/all", verifyToken, verifyAdmin, getAllProgress);

export default router;
