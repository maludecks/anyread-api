const Sentry = require('@sentry/node');
const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port);

Sentry.init({ dsn: 'https://3781cd5673024f20a96a7880d77f5bcb@sentry.io/1477852' });

app.use(Sentry.Handlers.requestHandler());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

console.log(`anyReadAPI server started on: ${port}`);
