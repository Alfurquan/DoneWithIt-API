const config = require("config");

const mapImage = (image) => {
  const baseUrl = config.get("assetsBaseUrl");
  if (!image) return null;
  return {
    url: `${baseUrl}${image}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image}_thumb.jpg`,
  };
};

const mapProfileImage = (image) => {
  const baseUrl = config.get("assetsBaseUrl");
  if (!image) return null;
  return {
    url: `${baseUrl}/profilePictures/${image}_full.jpg`,
    thumbnailUrl: `${baseUrl}/profilePictures/${image}_thumb.jpg`,
  };
};

module.exports = {
  mapImage,
  mapProfileImage,
};
