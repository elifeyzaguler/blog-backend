const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Username cannot be empty!"],
      minLength: [2, "Username cannot be shorter than 2 characters!"],
      maxLength: [15, "Username cannot be longer than 10 characters!"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Email cannot be empty!"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      // Select: false means Mongoose will not return the password field
      // by default when querying the database. This is a security feature.
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Only allowed values
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
