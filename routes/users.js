const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const profileImageResize = require("../middleware/profileImageResize");
const validateWith = require("../middleware/validation");
const userMapper = require("../mappers/users");
const { removeImage } = require("../utilities/files");
const multer = require("multer");
const _ = require("lodash");
const asyncMiddleware = require("../middleware/async");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post(
  "/",
  validateWith(schema),
  asyncMiddleware(async (req, res) => {
    const { name, email, password } = req.body;

    //Check if email is already regsitered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User({
      name,
      email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).send(user);
  })
);

router.put(
  "/profile",
  [auth, upload.single("profileImage"), profileImageResize],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    //If profile image is present delete the previous one
    if (user.profilePic) removeImage(user.profilePic);

    user.profilePic = req.image;
    await user.save();

    const userToSend = _.pick(user, ["_id", "name", "profilePic", "email"]);
    const resource = userMapper(userToSend);
    res.send(resource);
  })
);

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);
    const userToSend = _.pick(user, ["_id", "name", "profilePic", "email"]);
    const resource = userMapper(userToSend);
    res.send(resource);
  })
);

module.exports = router;
