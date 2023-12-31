import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    uploadTime: {
        type: Date,
        default: new Date(),
    },
    userId: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;