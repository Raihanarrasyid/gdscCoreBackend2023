import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
    postEvent,
    getAllEvents,
    getUserEvents,
    updateEventById,
    deleteEventById,
    getEventById,
    attendEvent,
    unattendEvent,
} from "../controllers/event.controller.js"

const router = express.Router();

router.get("/", getAllEvents);

router.get("/user", verifyToken, getUserEvents);

router.post("/", verifyToken, postEvent);

router.patch("/:id", verifyToken, updateEventById);

router.delete("/:id", verifyToken, deleteEventById);

router.get("/:id", verifyToken, getEventById);

router.patch("/:id/attend", verifyToken, attendEvent);

router.patch("/:id/unattend", verifyToken, unattendEvent);

export default router;