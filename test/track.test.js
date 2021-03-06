const request = require('supertest');
const server  = require('../server');

describe('Track API Suite', function() {
  before(() => {
  });

  it.skip('Can post a new entry', function(done) {
    
    request(server)
      .get('/track')
      .send({
        event_name: 'My event',
        event_data: {
            id: 1,
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 200,
      }, done);
  });
});
