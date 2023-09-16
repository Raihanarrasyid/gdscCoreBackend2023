import Event from "../models/Event.js";

export const postEvent = async (req, res) => {
  try {
    const { title, content, eventTime, location, tags } = req.body;
    const formattedTags = tags.split(" ");
    const event = new Event({
      title,
      content,
      eventTime,
      location,
      tags: formattedTags,
      userId: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (
      req.body.title === undefined ||
      req.body.content === undefined ||
      req.body.eventTime === undefined ||
      req.body.location === undefined ||
      req.body.tags === undefined
    ) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const { title, content, eventTime, location, tags } = req.body;
    const formattedTags = tags.split(" ");
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        eventTime,
        location,
        tags: formattedTags,
      },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userRegistered.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "User already attending this event" });
    }
    const attendeesAdded = event.userRegistered.push(req.user.id);
    event.userRegistered = attendeesAdded;
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unattendEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.userRegistered.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "User is not attending this event" });
    }
    const index = event.attendees.indexOf(req.user.id);
    const removed = event.userRegistered.splice(index, 1);
    event.userRegistered = removed;
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
