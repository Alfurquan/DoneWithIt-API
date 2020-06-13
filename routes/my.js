const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");
const { Listing } = require("../models/listings");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/listings",
  auth,
  asyncMiddleware(async (req, res) => {
    const listings = await Listing.find({ user: req.user._id })
      .populate("user", "name email profilePic")
      .lean();
    const resources = listings.map(listingMapper);
    res.send(resources);
  })
);

module.exports = router;
