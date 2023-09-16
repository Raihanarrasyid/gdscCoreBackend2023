import mongoose from "mongoose";

const progressSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    progressNumber: {
        type: Number,
        default: 0,
        max: 100,
    },
    progressTime: {
        type: Date,
        default: new Date(),
    },
    progressPic: {
        type: String,
        default: "",
    },
    progressSkills: {
        type: Array,
        default: [],
    },
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;