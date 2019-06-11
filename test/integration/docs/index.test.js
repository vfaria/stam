const request = require('supertest');
const httpStatus = require('http-status-codes');
const app = require('../../../src/app');
const { docs: { docsPath } } = require('../../../config/settings');

let server;

describe('Docs', () => {
  beforeEach((done) => {
    server = app.listen(done);
  });

  afterEach(done => server && server.close(done));

  it('Generate specs and compare it to snapshop', async () => {
    const response = await request(server)
      .get(docsPath)
      .expect(httpStatus.OK)
      .expect('x-request-id', /.*/);

    expect(response.body).toMatchSnapshot();
  });
});
