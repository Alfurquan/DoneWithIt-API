const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const mapper = require("../mappers/imageMapper");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  profilePic: {
    type: String,
  },
  expoPushToken: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      profilePic: mapper.mapProfileImage(this.profilePic),
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

exports.User = mongoose.model("User", userSchema);
