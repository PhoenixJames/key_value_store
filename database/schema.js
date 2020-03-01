const mongoose = require('mongoose');

const KeyValueSchema = new mongoose.Schema(
  {
    key: { type: String },
    value: { type: String },
    createdAt: { type: Date },
  },
);

const KeyValue = mongoose.model('KeyValue', KeyValueSchema);

module.exports = {
  KeyValue,
};