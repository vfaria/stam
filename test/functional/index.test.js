const request = require('supertest');
const httpStatus = require('http-status-codes');
const app = require('../../src/app');
const { name, version } = require('../../package.json');

let server;

describe('health-check', () => {
  beforeEach((done) => {
    server = app.listen(done);
  });

  afterEach(done => server && server.close(done));


  it('Should access health check', async () => {
    const response = await request(server)
      .get('/')
      .expect(httpStatus.OK)
      .expect('x-request-id', /.*/);

    expect(response.body).toEqual({ name, version });
  });
});
