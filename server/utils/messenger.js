const moment = require("moment");

function formatMessenger(username, text) {
  return {
    username: username,
    messenger: text,
    time: moment().format("h:mm a"),
  };
}

module.exports = {
  formatMessenger,
};
