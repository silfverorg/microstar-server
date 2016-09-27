const request = require('supertest');
const server = require('../server');
const should = require('should');

describe('Fetch API Suite', () => {
    before(() => {
    });

    it('Can get all entries', (done) => {
        request(server)
            .get('/fetch')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                try {
                    const body = res.body;
                    should(body).be.ok;
                    body.should.have.properties(['status', 'results']);
                    body.status.should.be.exactly(200);
                    body.results.should.be.an.Array;
                    body.results.length.should.be.above(0);
                    done();
                } catch (err) {
                    done(err);
                }
            })
    });
});
