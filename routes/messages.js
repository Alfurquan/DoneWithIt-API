const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const sendPushNotification = require("../utilities/pushNotifications");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");
const { Listing } = require("../models/listings");
const { User } = require("../models/user");
const { Message } = require("../models/message");
const messagesMapper = require("../mappers/messages");
const asyncMiddleware = require("../middleware/async");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  listingId: Joi.objectId().required(),
  message: Joi.string().required(),
};

router.get(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const messages = await Message.find({ toUser: req.user._id })
      .populate("fromUser", "name profilePic")
      .populate("toUser", "name")
      .lean();

    const resources = messages.map(messagesMapper);
    res.send(resources);
  })
);

router.post(
  "/",
  [auth, validateWith(schema)],
  asyncMiddleware(async (req, res) => {
    const { listingId, message } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(400).send({ error: "Invalid listingId." });

    const targetUser = await User.findById(listing.user);
    if (!targetUser) return res.status(400).send({ error: "Invalid userId." });

    const newMessage = new Message({
      fromUser: req.user._id,
      toUser: listing.user,
      listingId,
      content: message,
      date: Date.now(),
    });

    await newMessage.save();
    const { expoPushToken } = targetUser;

    if (Expo.isExpoPushToken(expoPushToken))
      await sendPushNotification(expoPushToken, message, targetUser);

    res.status(201).send({ Success: "message sent successfully" });
  })
);

module.exports = router;
