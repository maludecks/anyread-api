const rp = require('request-promise-native');

exports.getUrlContent = url => rp.get({ uri: url, encoding: null })
  .then(html => html)
  .catch((e) => {
    throw e;
  });
