const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outputFolder = "public/assets/profilePictures";

module.exports = async (req, res, next) => {
  let image = null;
  const resizePromise = async () => {
    const file = req.file;
    await sharp(file.path)
      .resize(2000)
      .jpeg({ quality: 50 })
      .toFile(path.resolve(outputFolder, file.filename + "_full.jpg"));

    await sharp(file.path)
      .resize(300)
      .jpeg({ quality: 40 })
      .toFile(path.resolve(outputFolder, file.filename + "_thumb.jpg"));

    fs.unlinkSync(file.path);

    image = file.filename;
  };

  await resizePromise();

  req.image = image;

  next();
};
