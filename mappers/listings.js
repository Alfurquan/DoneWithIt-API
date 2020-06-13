const imageMapper = require("./imageMapper");

const mapper = (listing) => {
  return {
    ...listing,
    images: listing.images.map(imageMapper.mapImage),
    user: {
      ...listing.user,
      profilePic: imageMapper.mapProfileImage(listing.user.profilePic),
    },
  };
};

module.exports = mapper;
