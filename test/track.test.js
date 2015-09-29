import request from 'supertest';
import server from '../server';

describe('Track API Suite', () => {
    before(() => {
    });

    it('Can post a new entry', (done) => {
        request(server)
            .post('/track')
            .send({
                event: 'My event',
                data: {
                    id: 1,
                },
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 200,
                message: 'You created an event!',
            }, done);
    });
});
