const moment = require('moment');

const utils = {
  convertTimeStamp(value) {
    return (moment(value).valueOf() / 1000).toFixed(0)
  },
};

module.exports = utils;