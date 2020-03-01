var http = require('http');
var createError = require('http-errors');
var bodyParser = require('body-parser');
require('./database/connection');
var express = require('express');
var debug = require('debug')
var app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
// Routes
var keyValueRoute = require('./routes/KeyValueRoute');
app.use('/api/object', keyValueRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const port = process.env.PORT || 3000
app.set('port', port);
const server = http.createServer(app);
server.listen(port,() => {
  console.log(`Server running at port `+port);
});