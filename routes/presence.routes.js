import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

import {
    postPresence,
    getAllPresences,
    getUserPresences,
    getPresenceById,
    updatePresenceById,
    deletePresenceById,
    deleteAllPresence,
    deleteAllPresenceFromEvent,
    deleteAllPresenceFromUser,
    deleteAllPresenceFromUserAndEvent
} from "../controllers/presence.controller.js";

const router = express.Router();

router.get("/", verifyToken, getUserPresences);
router.post("/", verifyToken, postPresence);
router.patch("/:id", verifyToken, updatePresenceById);
router.delete("/:id", verifyToken, deletePresenceById);
router.get("/:id", verifyToken, verifyAdmin, getPresenceById);
router.get("/all", verifyToken, verifyAdmin, getAllPresences);
router.delete("/all", verifyToken, verifyAdmin, deleteAllPresence);
router.delete("/all/:id", verifyToken, verifyAdmin, deleteAllPresenceFromEvent);
router.delete("/all/:id", verifyToken, verifyAdmin, deleteAllPresenceFromUser);
router.delete("/all/:id/:id", verifyToken, verifyAdmin, deleteAllPresenceFromUserAndEvent);

export default router;