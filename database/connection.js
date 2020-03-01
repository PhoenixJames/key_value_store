const mongoose = require('mongoose');
const debug = require('debug')('DEBUG');
mongoose.connect('mongodb+srv://admin_user:passw0rd@cluster0-8jy1j.mongodb.net/key_value_store?retryWrites=true&w=majority'
  , {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  debug('success');
});