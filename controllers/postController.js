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
