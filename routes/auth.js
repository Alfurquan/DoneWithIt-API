const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const validateWith = require("../middleware/validation");
const { User } = require("../models/user");
const asyncMiddleware = require("../middleware/async");

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post(
  "/",
  validateWith(schema),
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).send({ error: "Invalid email or password." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ error: "Invalid email or password." });

    const token = user.generateAuthToken();
    res.send(token);
  })
);

module.exports = router;
