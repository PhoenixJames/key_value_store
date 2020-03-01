const debug = require('debug')('DEBUG');
const moment = require('moment');
const {
  KeyValue
} = require('../database/schema');

const getKeyValue = async function(req, res) {
  const { key } = req.params;
  let ret = await KeyValue.aggregate([
    {
      $match: {
        key,
      }
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
    const output = {
      key: ret[0]._id,
      value: ret[0].value,
      timestamp: ret[0].timestamp.getTime(),
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
      return res.status(404).send('error');
    }
    return res.status(200).send(data);
  })
}

module.exports = {
  getKeyValue,
  postKeyValue
};