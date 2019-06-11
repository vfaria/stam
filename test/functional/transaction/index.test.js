const request = require('supertest');
const httpStatus = require('http-status-codes');
const {
  model: {
    VALIDATION_ERROR
  }
} = require('../../../src/common/errors/error-codes');
const app = require('../../../src/app');

let server;
let transaction;
let id;

const basePath = '/v1/monitoring/transaction';

describe('Transaction', () => {
  beforeEach((done) => {
    transaction = {
      name: 'name',
      statusId: 1
    };
    server = app.listen(done);
  });

  afterEach(done => server && server.close(done));

  describe('#post', () => {
    it('Should create a transaction', async () => {
      const response = await request(server)
        .post(basePath)
        .send(transaction)
        .expect(httpStatus.CREATED)
        .expect('x-request-id', /.*/)
        .expect('x-id', /.*/)
        .expect('location', /\/v1\/monitoring\/transaction\/*/);

      expect(response.body).toEqual({});
    });

    it('Should create a transaction with prefer header true', async () => {
      const response = await request(server)
        .post(basePath)
        .send(transaction)
        .set('Prefer', 'return-representation')
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/)
        .expect('x-id', /.*/)
        .expect('location', /\/v1\/monitoring\/transaction\/*/);

      expect(response.body.name).toEqual(transaction.name);
      expect(response.body.statusId).toEqual(transaction.statusId);

      id = response.headers['x-id'];
    });

    describe('errors', () => {
      it('Should validate required fields', async () => {
        const response = await request(server)
          .post(basePath)
          .send({})
          .set('Prefer', 'return-representation')
          .expect(httpStatus.UNPROCESSABLE_ENTITY)
          .expect('x-request-id', /.*/);

        expect(response.body[0].field).toEqual('statusId');
        expect(response.body[0].code).toEqual(VALIDATION_ERROR);
      });
    });
  });

  describe('#get', () => {
    it('Should get transaction', async () => {
      const response = await request(server)
        .get(basePath)
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('statusId');
      expect(response.body[0]).toHaveProperty('statusName');
    });

    it('Should get transaction by filter', async () => {
      const qs = {
        per_page: 1,
        page: 1,
        filter: {
          id
        },
        fields: 'name'
      };

      const response = await request(server)
        .get(basePath)
        .query(qs)
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual({ name: transaction.name });
    });
  });

  describe('#getById', () => {
    it('Should get transaction by id', async () => {
      const response = await request(server)
        .get(`${basePath}/${id}`)
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body.id).toEqual(id);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('statusId');
      expect(response.body).toHaveProperty('statusName');
    });

    it('Should get only name and id fields transaction by id', async () => {
      const qs = {
        fields: 'name, id'
      };

      const response = await request(server)
        .get(`${basePath}/${id}`)
        .query(qs)
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body.id).toEqual(id);
      expect(response.body).toEqual({ name: transaction.name, id });
    });
  });

  describe('#put', () => {
    it('Should update a transaction', async () => {
      const name = 'other name';

      const response = await request(server)
        .put(`${basePath}/${id}`)
        .send({ ...transaction, name })
        .set('Prefer', 'return-representation')
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body.name).toEqual(name);
    });
  });

  describe('#del', () => {
    it('Should delete a transaction', async () => {
      const response = await request(server)
        .del(`${basePath}/${id}`)
        .set('Prefer', 'return-representation')
        .expect(httpStatus.OK)
        .expect('x-request-id', /.*/);

      expect(response.body.id).toEqual(id);

      await request(server)
        .get(`${basePath}/${id}`)
        .expect(httpStatus.NOT_FOUND)
        .expect('x-request-id', /.*/);
    });
  });
});
