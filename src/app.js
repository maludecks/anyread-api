const express = require('express');
const readerController = require('./controllers/readerController');

const app = express();

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/parse', readerController.parseUrl);

module.exports = app;
