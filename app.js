const express = require('express');
const readerController = require('./controllers/readerController');

const app = express();

app.get('/parse', readerController.parseUrl);

module.exports = app;
