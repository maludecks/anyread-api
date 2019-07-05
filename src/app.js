const Sentry = require('@sentry/node');
const express = require('express');
const readerController = require('./controllers/readerController');

const app = express();

Sentry.init({
  release: 'anyread-api@1.0.0'
});

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/parse', readerController.parseUrl);

app.get('/debug-sentry', (req, res) => {
  throw new Error('My first Sentry error!');
});

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
