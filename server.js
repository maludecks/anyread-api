const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('AnyReadAPI server started on: ' + port);
