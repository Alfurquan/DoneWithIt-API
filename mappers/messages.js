const imageMapper = require("./imageMapper");

const mapper = (message) => {
  return {
    ...message,
    fromUser: {
      ...message.fromUser,
      profilePic: imageMapper.mapProfileImage(message.fromUser.profilePic),
    },
  };
};

module.exports = mapper;
