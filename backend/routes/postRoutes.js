const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content, author } = req.body;

    const post = new Post({
      content,
      author,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Like / Unlike Post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

 const alreadyLiked = post.likes.some(
  (id) => id && id.toString() === req.body.userId
);

    if (alreadyLiked) {
     post.likes = post.likes.filter(
  (id) => id && id.toString() !== req.body.userId
);
    } else {
      post.likes.push(req.body.userId);
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("LIKE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;