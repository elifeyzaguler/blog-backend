const User = require("../models/User");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (Kimlik doğrulamasına gerek yok)

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please enter username, email and password!",
      });
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      message: "User is successfully registered!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter username and password!" });
  }
  try {
    let user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password!" });
    }

    const token = user.getJwtToken();
    res.status(200).json({ status: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
