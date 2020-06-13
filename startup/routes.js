const categories = require("../routes/categories");
const listings = require("../routes/listings");
const listing = require("../routes/listing");
const users = require("../routes/users");
const auth = require("../routes/auth");
const my = require("../routes/my");
const messages = require("../routes/messages");
const error = require("../middleware/error");
const expoPushTokens = require("../routes/expoPushTokens");

const express = require("express");

module.exports = function (app) {
  app.use(express.static("public"));
  app.use(express.json({ limit: "50mb" }));

  app.use("/api/categories", categories);
  app.use("/api/listing", listing);
  app.use("/api/listings", listings);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/my", my);
  app.use("/api/expoPushTokens", expoPushTokens);
  app.use("/api/messages", messages);
  app.use(error);
};
