const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title!"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: true,
    },
    slug: String,
    author: {
      type: String,
      default: "Anonymous",
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [String],
  },
  {
    // Automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
