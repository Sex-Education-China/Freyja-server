const User = require("../modules/User");
const Video = require("../modules/Video");


 async function isAdmin(username) {
    if (await  User.findOne({ username: username, isAdmin: true })) {
      return true
    } else {
      return false
    }
}
async function isVip(username) {
  if (await User.findOne({ username: username, isVip: true })) {
    return true
  } else {
    return false
  }
}
async function getVideoInfo(id) {
    const video = await Video.findOne({ id: id });
    return video
}
module.exports = {
    isAdmin,
    isVip
}