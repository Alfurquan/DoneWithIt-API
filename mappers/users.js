const config = require("config");
const imageMapper = require("./imageMapper");

const mapper = (user) => {
  return {
    ...user,
    profilePic: imageMapper.mapProfileImage(user.profilePic),
  };
};

module.exports = mapper;
