'use strict';
const Readability = require('readability');
const JSDOM = require('jsdom').JSDOM;
const logger = require('../utils/logger');
const errors = require('request-promise-native/errors');

const parserRepository = require('../repositories/parserRepository');

exports.parseUrl = async function(req, res) {
  const query = req.query;

  if (!query || !query.url) {
    const err = 'No URL provided';
    logger.log(err, 'debug');
    return res.status(400).send(err);
  }

  const url = query.url;

  try {
    const urlContent = await parserRepository.getUrlContent(url);
    const dom = new JSDOM(urlContent, { url });
    const parsedContent = new Readability(dom.window.document).parse();

    const response = {
      article: parsedContent
    };

    return res.status(200).send(response);
  } catch(e) {
    logger.log(e.stack, 'debug');

    if (e instanceof errors.RequestError) {
      if (e.message.includes('Invalid URI')) {
        return res.status(404).send('URL provided is not a valid URL');
      }
    }

    return res.status(500).send('Could not parse the URL provided');
  }
}
