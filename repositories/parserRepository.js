'use strict';
const rp = require('request-promise-native');

exports.getUrlContent = function(url) {
  return rp.get(url)
    .then(function(html) {
      return html;
    })
    .catch(function(e) {
      throw e;
    });
}
