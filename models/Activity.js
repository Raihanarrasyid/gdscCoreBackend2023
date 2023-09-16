import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    activityTime: {
        type: Date,
        default: new Date(),
    },
    activitySkills: {
        type: Array,
        default: [],
    },
    ActivityPictureUrl: {
        type: String,
        default: "/assets/activities/default.png",
    },
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;