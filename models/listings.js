const mongoose = require("mongoose");
const { number } = require("joi");

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  description: {
    type: String,
    min: 5,
    max: 255,
  },
  price: {
    type: Number,
    min: 2,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [
    {
      type: String,
    },
  ],
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

exports.Listing = mongoose.model("Listing", listingSchema);
