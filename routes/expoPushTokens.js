const express = require("express");
const router = express.Router();
const Joi = require("joi");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const { User } = require("../models/user");
const asyncMiddleware = require("../middleware/async");

router.post(
  "/",
  [auth, validateWith({ token: Joi.string().required() })],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send({ error: "Invalid user." });

    user.expoPushToken = req.body.token;
    await user.save();
    res.status(201).send();
  })
);

module.exports = router;
