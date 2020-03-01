const debug = require('debug')('DEBUG');
const moment = require('moment');
const utils = require('./utils');
const {
  KeyValue
} = require('../database/schema');

const getKeyValue = async function(req, res) {
  const { key } = req.params;
  let { timestamp } = req.query;
  const datetime = utils.convertTimestampToDateTime(timestamp);
  debug({ query: timestamp });
  let ret = await KeyValue.aggregate([
    {
      $match: {
        $and: [
          {
            key,
          },
          {
            createdAt: { $lte: datetime },
          }
        ],
      },
    },
    {
      $sort: { 'createdAt': -1 }
    },
    {
      $group: {
        _id: '$key',
        value: { $first: '$value'},
        timestamp: { $first: '$createdAt'},
      },
    }
  ]);
  debug(ret);
  if (ret) {
    ret = ret.find(e => e._id == key) || {};
    const output = {
      key: ret._id,
      value: ret.value,
      timestamp: utils.convertTimeStamp(ret.timestamp),
    };
    return res.status(200).send(output);
  }
  return res.status(404).send('error');
}
const postKeyValue = function(req, res) {
  const { 
    key,
    value,
  } = req.body;
  timestamp = moment.utc();
  new KeyValue({
    key,
    value,
    createdAt: timestamp
  }).save(function (err, data) {
    if(err) {
      return res.status(404).send(err);
    }
    const output = {
      key: data.key,
      value: data.value,
      timestamp: utils.convertTimeStamp(data.createdAt),
    }
    return res.status(200).send(output);
  })
}

module.exports = {
  getKeyValue,
  postKeyValue
};