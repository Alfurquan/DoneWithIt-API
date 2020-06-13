const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 255,
  },
  icon: {
    type: String,
    min: 1,
    max: 255,
  },
  backgroundColor: {
    type: String,
    min: 1,
    max: 255,
  },
  color: {
    type: String,
    min: 1,
    max: 255,
  },
});

exports.Category = mongoose.model("Category", categorySchema);
