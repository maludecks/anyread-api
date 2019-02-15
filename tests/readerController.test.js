const request = require('supertest');
const app = require('../src/app');
const parserRepository = require('../src/repositories/parserRepository');
const logger = require('../utils/logger');

const requestFixture = require('./fixtures/requestFixture');
const responseFixture = require('./fixtures/responseFixture');

const agent = request.agent(app);

describe('readerController', () => {
  test('should return 400 when no URL provided', async () => {
    const response = await agent.get('/parse').query({});

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('No URL provided');
  });

  test('should return 400 when empty URL provided', async () => {
    const response = await agent.get('/parse').query({ url: '' });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('No URL provided');
  });

  test('should return 404 when invalid URL provided', async () => {
    const response = await agent.get('/parse').query({ url: 'this-is-not-a-valid-url' });

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('URL provided is not a valid URL');
  });

  test('should return 500 when unexpected error thrown', async () => {
    jest.spyOn(parserRepository, 'getUrlContent').mockImplementation(() => {
      throw new TypeError;
    });

    const response = await agent.get('/parse').query({ url: 'http://google.com' });

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Could not parse the URL provided');
  });

  test('should return 200 with parsed article when successfully parsed', async () => {
    jest.spyOn(parserRepository, 'getUrlContent').mockReturnValue(requestFixture);

    const response = await agent.get('/parse').query({ url: 'http://google.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(responseFixture);
  });
});
