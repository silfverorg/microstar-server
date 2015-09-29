import request from 'supertest';
import server from '../server';

describe('Server Suite', () => {
    before(() => {
    });

    it('Handles a basic get request', (done) => {
        request(server)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 200,
                version: '0.0.2',
            }, done);
    });
});
