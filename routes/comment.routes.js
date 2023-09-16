import express from "express";

import { verifyToken } from "../middlewares/auth.middleware.js";

import {
  postComment,
  getAllCommentsFromPost,
  getAllCommentsFromUser,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", verifyToken,getAllCommentsFromUser);

router.post("/:id", verifyToken, postComment);

router.patch("/:id", verifyToken, updateCommentById);

router.delete("/:id", verifyToken, deleteCommentById);

router.get("/:id", verifyToken, getCommentById);

router.get("/:id", getAllCommentsFromPost);

export default router;

