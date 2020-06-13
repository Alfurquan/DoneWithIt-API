const mongoose = require("mongoose");
const dotenv = require("dotenv");

module.exports = function () {
  //DB Connection
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((err) => {
      console.log("Could not connect to MongoDB..", err);
    });
};
