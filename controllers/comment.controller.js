import Comment from "../models/Comment.js";

export const postComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = new Comment({
        content,
        userId: req.user.id,
        postId: req.params.id,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCommentsFromPost = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCommentsFromUser = async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.user.id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.body.content === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                content,
            },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};