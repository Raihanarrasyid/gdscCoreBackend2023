import Presence from "../models/Presence.js";

export const postPresence = async (req, res) => {
    try {
        const { presenceTime } = req.body;
        const presenceEvent = req.params.eventId;
        const presence = new Presence({
        userId: req.user.id,
        presenceTime,
        eventId: presenceEvent,
        });
        await presence.save();
        res.status(201).json(presence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPresences = async (req, res) => {
    try {
        const presence = await Presence.find();
        res.status(200).json(presence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserPresences = async (req, res) => {
    try {
        const presence = await Presence.find({ userId: req.user.id });
        res.status(200).json(presence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPresenceById = async (req, res) => {
    try {
        const presence = await Presence.findById(req.params.id);
        res.status(200).json(presence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePresenceById = async (req, res) => {
    try {
        const presence = await Presence.findById(req.params.id);
        if (presence.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.body.presenceTime === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { presenceTime } = req.body;
        const updatedPresence = await Presence.findByIdAndUpdate(
            req.params.id,
            {
                presenceTime,
            },
            { new: true }
        );
        res.status(200).json(updatedPresence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePresenceById = async (req, res) => {
    try {
        const presence = await Presence.findById(req.params.id);
        if (presence.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await Presence.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Presence deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllPresence = async (req, res) => {
    try {
        await Presence.deleteMany();
        res.status(200).json({ message: "All presence deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllPresenceFromUser = async (req, res) => {
    try {
        await Presence.deleteMany({ userId: req.user.id });
        res.status(200).json({ message: "All presence from user deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllPresenceFromEvent = async (req, res) => {
    try {
        await Presence.deleteMany({ eventId: req.params.eventId });
        res.status(200).json({ message: "All presence from event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllPresenceFromUserAndEvent = async (req, res) => {
    try {
        await Presence.deleteMany({ userId: req.user.id, eventId: req.params.eventId });
        res.status(200).json({ message: "All presence from user and event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

