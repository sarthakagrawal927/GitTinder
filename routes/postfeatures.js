const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const checkObjectId = require("../middleware/checkObjectId");

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const profile = await Profile.findOne({ user: post.user });
    const likes = post.likes.length;

    await post.remove();

    profile.likes = profile.likes - likes;
    profile.numberOfPosts--;

    await profile.save();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Edit api/posts/:id
// @desc     Edit a post
// @access   Private
router.patch(
  "/:id",
  [auth, checkObjectId("id")],
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.id);

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      post.text = req.body.text;
      post.name = user.name;
      post.user = req.user.id;
      post.userDP = profile.displayPictureURL;
      post.imageURL = req.body.imageURL;
      post.category = req.body.category;

      await post.save();

      res.json({ msg: "Post Edited" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    const profile = await Profile.findOne({ user: post.user });
    profile.likes++;

    post.likes.unshift({ user: req.user.id });

    await post.save();
    await profile.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id,
    );

    const profile = await Profile.findOne({ user: post.user });
    profile.likes--;

    await profile.save();
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
