const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// route POST api/posts
//Create post (private)

router.post(
  "/",
  [auth, [check("text", "Test is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await (await User.findById(req.user.id)).isSelected(
        "-password",
      );

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: user.id,
        avatar: user.avatar,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },
);

// route GET api/posts
//get all post (private)

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //will show recent first
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route GET api/posts
//get post by id (private)

router.get("/:id", auth, async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      //Yes valid id
      const posts = await Post.findById(req.params.id);
      if (!posts) {
        return res.status(404).json("msg: 'Post not found'");
      }
      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json("msg: 'Post not found'");
    }

    return res.status(500).json({ msg: "Server error" });
  }
});

// route DELETE api/posts/:id
//delete a post (private)

router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      //Yes valid id
      const post = await Post.findById(req.params.id);
      if (post.user + "" !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      await post.remove();
      return res.json({ msg: "Post removed" });
    }

    //Check whether user owns the post
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json("msg: 'Post not found'");
    }
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
