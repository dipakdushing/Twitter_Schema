const express = require("express");

const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const router = express.Router();

// POSTS CRUD 

router.get("", async (req, res) => {
  try {
    const posts = await Post.find()
     
      .populate({
        path: "userId",
        select: { firstName: 1, email: 1, _id: 0 },
      })
      .lean()
      .exec();

    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", async (req, res) => {
    try {
      const posts = await Post.create(req.body);
      return res.status(201).send(posts);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "userId", select: ["email"] })
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        
      return res.status(200).send(post);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



router.get("/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .lean()
      .exec();

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
