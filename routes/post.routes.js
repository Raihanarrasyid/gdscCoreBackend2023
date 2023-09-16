import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
    postPost,
    getAllPosts,
    getUserPosts,
    getPostById,
    updatePostById,
    deletePostById,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/user", verifyToken, getUserPosts);

router.post("/", verifyToken, postPost);

router.patch("/:id", verifyToken, updatePostById);

router.delete("/:id", verifyToken, deletePostById);

router.get("/:id", verifyToken, getPostById);

export default router;