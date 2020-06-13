const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const { Listing } = require("../models/listings");
const { Category } = require("../models/category");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");
const asyncMiddleware = require("../middleware/async");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.objectId().required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
};

const validateCategoryId = async (req, res, next) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    try {
      const listings = await Listing.find()
        .populate("user", "name email profilePic")
        .lean();
      const resources = listings.map(listingMapper);
      res.send(resources);
    } catch (ex) {
      next(ex);
    }
  })
);

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    auth,
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],
  asyncMiddleware(async (req, res) => {
    const listing = new Listing({
      title: req.body.title,
      price: req.body.price,
      categoryId: req.body.categoryId,
      description: req.body.description,
    });

    listing.images = req.images;
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.user = req.user._id;

    await listing.save();

    res.status(201).send(listing);
  })
);

module.exports = router;
