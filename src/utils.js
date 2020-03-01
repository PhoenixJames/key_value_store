const moment = require('moment');

const utils = {
  convertTimeStamp(value) {
    return (moment(value).valueOf() / 1000).toFixed(0)
  },
  convertTimestampToDateTime(value) {
    return value != null && value != ''
      ? new Date(value * 1000) : new Date();
  },
};

module.exports = utils;