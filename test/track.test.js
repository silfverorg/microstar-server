const request = require('supertest');
const server  = require('../server');

describe('Track API Suite', () => {
    before(() => {
    });

    it('Can post a new entry', (done) => {
        request(server)
            .post('/track')
            .send({
                event_name: 'My event',
                event_data: {
                    id: 1,
                },
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 200,
            }, done);
    });
});
