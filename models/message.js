const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

exports.Message = mongoose.model("Message", messageSchema);
