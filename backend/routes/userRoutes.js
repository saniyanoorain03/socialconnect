const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Follow User
router.put("/:id/follow", async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!userToFollow.followers.includes(req.body.userId)) {
      userToFollow.followers.push(req.body.userId);
      currentUser.following.push(req.params.id);

      await userToFollow.save();
      await currentUser.save();

      res.status(200).json({
        message: "User Followed Successfully",
      });
    } else {
      res.status(400).json({
        message: "Already Following",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/unfollow", async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    userToUnfollow.followers.pull(req.body.userId);

    currentUser.following.pull(req.params.id);

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({
      message: "User Unfollowed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;