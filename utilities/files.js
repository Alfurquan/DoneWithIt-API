const fs = require("fs");

exports.removeImage = (imageName) => {
  fs.unlinkSync("public" + getFullImagePath(imageName));
  fs.unlinkSync("public" + getThumbnailImagePath(imageName));
};

const getFullImagePath = (imageName) => {
  return "\\assets\\profilePictures\\" + imageName + "_full.jpg";
};

const getThumbnailImagePath = (imageName) => {
  return "\\assets\\profilePictures\\" + imageName + "_thumb.jpg";
};
