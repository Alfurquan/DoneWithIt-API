const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");
const { Listing } = require("../models/listings");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const listing = await Listing.findById(req.params.id).lean();
    if (!listing) return res.status(404).send();
    const resource = listingMapper(listing);
    res.send(resource);
  })
);

module.exports = router;
