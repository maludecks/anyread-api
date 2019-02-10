'use strict';
const Readability = require('readability');
const JSDOM = require('jsdom').JSDOM;
const logger = require('../utils/logger');

const parserRepository = require('../repositories/parserRepository');

exports.parseUrl = async function(req, res) {
  const query = req.query;

  if (!query || !query.url) {
    const err = 'No URL provided';
    logger.log(err, 'debug');
    res.status(400);
    res.send(err);
  }

  const url = query.url;

  if (url === '') {
    const err = 'URL is empty';
    logger.log(err, 'debug');
    res.status(400);
    res.send(err);
  }

  try {
    const urlContent = await parserRepository.getUrlContent(url);
    const dom = new JSDOM(urlContent, { url });
    const parsedContent = new Readability(dom.window.document).parse();

    const response = {
      article: parsedContent
    };

    res.status(200);
    res.send(response);
  } catch(e) {
    logger.log(e.stack, 'debug');
    throw e;
  }
}
