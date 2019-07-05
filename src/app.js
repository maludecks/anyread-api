const Sentry = require('@sentry/node');
const express = require('express');
const readerController = require('./controllers/readerController');

const app = express();

Sentry.init({
  release: 'a5cc17d885c02358d1e4a875c7c61723a182fb1e'
});

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/parse', readerController.parseUrl);

app.get('/debug-sentry', (req, res) => {
  throw new Error('My first Sentry error!');
});

app.get('/debug-sentry-2', (req, res) => {
  throw new Error('My second Sentry error!');
});

app.use(Sentry.Handlers.errorHandler());

module.exports = app;
