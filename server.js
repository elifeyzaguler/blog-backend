require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
const PORT = 3000;

const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.get("/", (req, res) => {
  res.send("Blog app is running and connected to DB!");
});

connectDB();
