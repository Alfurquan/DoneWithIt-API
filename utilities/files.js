const fs = require("fs");
const path = require("path");

exports.removeImage = (imageName) => {
  fs.unlinkSync(getFullImagePath(imageName));
  fs.unlinkSync(getThumbnailImagePath(imageName));
};

const getFullImagePath = (imageName) => {
  return path.join(
    "public",
    "assets",
    "profilePictures",
    imageName + "_full.jpg"
  );
};

const getThumbnailImagePath = (imageName) => {
  return path.join(
    "public",
    "assets",
    "profilePictures",
    imageName + "_thumb.jpg"
  );
};
