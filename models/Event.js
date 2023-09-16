import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    uploadTime: {
        type: Date,
        default: new Date(),
    },
    eventTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userRegistered: {
        type: Array,
        default: [],
    },
    tags: {
        type: Array,
        default: [],
    },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;