const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");

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
      const user = await User.findById(req.user.id).isSelected("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
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
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// route GET api/posts
//get post by id (private)

router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts || req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json("msg: 'Post not found'");
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route DELETE api/posts/:id
//delete a post (private)

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user + "" !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    if (!post || req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });

    //Check whether user owns the post
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// route PUT api/posts/like/:id
//like a post (private)

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if th post have already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "You have already liked the post" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route PUT api/posts/unlike/:id
//like a post (private)

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if th post have already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    // Remove like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id,
    );

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route POST api/posts/comment/:id
//Comment on a post (private)

router.post(
  "/comment/:id",
  [auth, [check("text", "Test is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).isSelected("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: user.id,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server error" });
    }
  },
);

// route DELETE api/posts/comment/:id/:comment_id
//Comment on a post (private)

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //get comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id,
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    if (comment.user + "" !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Remove comment
    post.comments = post.comments.filter(({ id }) => id + "" !== req.user.id);

    await post.save();
    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
