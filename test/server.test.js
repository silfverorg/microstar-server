const request = require('supertest');
const server = require('../server');
const pjson = require('../package.json');

describe('Server Suite', () => {
  before(() => {
  });

  it('Handles a basic get request', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 200,
        version: pjson.version,
      }, done);
  });
});
