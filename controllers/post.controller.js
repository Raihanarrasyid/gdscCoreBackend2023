import Post from "../models/Post.js";

export const postPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const formattedTags = tags.split(" ");
        const post = new Post({
            title,
            content,
            tags: formattedTags,
            userId: req.user.id,
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (
            req.body.title === undefined ||
            req.body.content === undefined ||
            req.body.tags === undefined
        ) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { title, content, tags } = req.body;
        const formattedTags = tags.split(" ");
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                tags: formattedTags,
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await post.delete();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};