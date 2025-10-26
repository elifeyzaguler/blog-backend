const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post.create({
      title: req.title,
      content: req.content,
      author: req.user.username,
      tags: req.tags,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const postList = await Post.find();
    if (!postList || postList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Error fetching posts" });
    }
    res.status(200).json({ success: true, data: postList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPostByAuthor = async (req, res) => {
  try {
    const postList = await Post.find({ author: req.params.username });
    if (!postList || postList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Error fetching posts" });
    }
    res.status(200).json({ success: true, data: postList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
