const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostByAuthor,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:username", protect, getPostByAuthor);
router.post("/create", protect, createPost);

module.exports = router;
