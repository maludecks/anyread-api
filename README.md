# anyRead.api

Node.js API that returns only the reading content of the informed url, using [mozilla/readability](https://github.com/mozilla/readability) library to parse it. Check the [demo version here](https://anyread-api.herokuapp.com).

[![Build Status](https://travis-ci.com/maludecks/anyread-api.svg?branch=master)](https://travis-ci.com/github/maludecks/anyread-api)

## installing
To run this API locally you need [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed.

First install all the dependencies:
```
yarn install
```

After the dependencies are finished installing, you can start the local server with:
```
yarn start
```

After that, you should be able to make requests to your localhost on port 3000, by default.

You can also use a different port:
```
PORT={YOUR_FAVORITE_PORT} yarn start
```

## request
To parse the contents of a url, make a `GET` request to `/parse` endpoint, and inform the `url` as query string:
```
/parse?url={URL_YOU_WANT_TO_PARSE}
```

## response
As response for a successful request, you will get a JSON containing the following:

```json
{
   "article": {
      "title": "article title",
      "byline": "author metadata",
      "dir": "content direction",
      "content": "HTML string of processed article content",
      "textContent": "article text without the HTML",
      "length": "length of an article, in characters",
      "excerpt": "article description, or short excerpt from the content",
      "siteName": "website name"
   },
   "success": true
}
```

On a failed request, you will get a JSON containing:
```json
{
   "error": "Error message goes here...",
   "success": false
}
```

for more information on how the article is parsed check [mozilla/readability](https://github.com/mozilla/readability) docs.

## tests
All tests are written using [jest](https://jestjs.io/).

To run the tests:
```
yarn test
```

And to run the linter ([eslint](https://eslint.org/)):
```
yarn lint
```
