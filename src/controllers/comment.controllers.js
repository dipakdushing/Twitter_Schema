
const express = require("express");

const Comment = require("../models/comment.model");

const router = express.Router();

// COMMENTS CRUD
router.get("", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "postId",
        select: ["title"],
        populate: { path: "userId", select: ["firstName"] },
      })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.post("", async (req, res) => {
    try {
      const comments = await Comment.create(req.body);
      return res.status(201).send(comments);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate({
        path: "postId",
        select: ["title", "body"],
        populate: { path: "userId", select: ["password", "firstName"] },
      })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(201).send(comment);
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    
      .populate({
        path: "postId",
        select: ["title"],
        populate: { path: "userId", select: ["firstName"] },
      })
      .populate({ path: "userId", select: ["email"] })
      .lean()
      .exec();

    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const comments = await Comment.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(comments);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
