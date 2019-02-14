'use strict';
const rp = require('request-promise-native');

exports.getUrlContent = function(url) {
  return rp.get({ uri: url, encoding: null })
    .then(function(html) {
      return html;
    })
    .catch(function(e) {
      throw e;
    });
}
