var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var reader = require('./controllers/readerController');

app.listen(port);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/parse')
  .get(reader.parseUrl);

console.log('AnyReadAPI server started on: ' + port);
