import mongoose from "mongoose";

const presenceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    presenceTime: {
        type: Date,
        default: new Date(),
    },
    eventId: {
        type: String,
        required: true,
    },
});

const Presence = mongoose.model("Presence", presenceSchema);

export default Presence;