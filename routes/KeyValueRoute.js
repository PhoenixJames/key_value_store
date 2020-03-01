const {
  postKeyValue,
  getKeyValue
} = require('../src/KeyValue');
const express = require('express');
var router = express.Router();

router.post('/', postKeyValue);
router.get('/:key', getKeyValue);

module.exports = router;