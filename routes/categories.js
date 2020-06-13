const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  })
);

module.exports = router;
