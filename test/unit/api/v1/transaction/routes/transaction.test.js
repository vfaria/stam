const routes = require('../../../../../../src/api/v1/transaction/routes/transaction');

let router;
let docs;
let controller;
let ctx;

describe('Transaction routes', () => {
  beforeEach(() => {
    router = {
      post: jest.fn(() => router),
      put: jest.fn(() => router),
      get: jest.fn(() => router),
      delete: jest.fn(() => router)
    };

    ctx = 'foo';

    docs = {
      createTransaction: jest.fn(args => args(ctx)),
      getTransaction: jest.fn(args => args(ctx)),
      getTransactionById: jest
        .fn(({ handlers, transactionIdParamKey }) => handlers(ctx, transactionIdParamKey)),
      updateTransaction: jest
        .fn(({ handlers, transactionIdParamKey }) => handlers(ctx, transactionIdParamKey)),
      deleteTransaction: jest
        .fn(({ handlers, transactionIdParamKey }) => handlers(ctx, transactionIdParamKey))
    };

    controller = {
      paramIdKey: 'paramIdKey',
      post: jest.fn().mockReturnValue('POST'),
      put: jest.fn().mockReturnValue('PUT'),
      get: jest.fn().mockReturnValue('GET'),
      getById: jest.fn().mockReturnValue('GETBYID'),
      del: jest.fn().mockReturnValue('DEL'),
    };
  });

  it('Should have a loadIn function', () => {
    expect(routes.loadIn).toBeInstanceOf(Function);
  });

  describe('post', () => {
    it('Should call route.post', () => {
      routes.loadIn(router);

      expect(router.post).toHaveBeenCalledTimes(1);
      expect(router.post).toHaveBeenCalledWith('/', expect.any(Object));
    });

    it('Should call and docs.createTransaction', () => {
      routes.loadIn(router, docs, controller);

      expect(docs.createTransaction).toHaveBeenCalledTimes(1);
    });

    it('Should call controller.post (forced)', () => {
      routes.loadIn(router, docs, controller);

      expect(router.post).toHaveBeenCalledTimes(1);
      expect(router.post).toHaveBeenCalledWith('/', 'POST');
      expect(controller.post).toHaveBeenCalledTimes(1);
      expect(controller.post).toHaveBeenCalledWith(ctx);
    });
  });

  describe('get', () => {
    it('Should call controller.get', () => {
      routes.loadIn(router, docs, controller);

      expect(router.get).toHaveBeenCalledTimes(2);
      expect(router.get).toHaveBeenCalledWith('/', 'GET');
      expect(controller.get).toHaveBeenCalledTimes(1);
      expect(controller.get).toHaveBeenCalledWith(ctx);
      expect(docs.getTransaction).toHaveBeenCalledTimes(1);
    });

    it('Should call controller.getById', () => {
      routes.loadIn(router, docs, controller);

      expect(router.get).toHaveBeenCalledTimes(2);
      expect(router.get).toHaveBeenCalledWith(`/:${controller.paramIdKey}`, 'GETBYID');
      expect(controller.getById).toHaveBeenCalledTimes(1);
      expect(controller.getById).toHaveBeenCalledWith(ctx, controller.paramIdKey);
      expect(docs.getTransactionById).toHaveBeenCalledTimes(1);
    });
  });

  describe('put', () => {
    it('Should call controller.put', () => {
      routes.loadIn(router, docs, controller);

      expect(router.put).toHaveBeenCalledTimes(1);
      expect(router.put).toHaveBeenCalledWith(`/:${controller.paramIdKey}`, 'PUT');
      expect(controller.put).toHaveBeenCalledTimes(1);
      expect(controller.put).toHaveBeenCalledWith(ctx, controller.paramIdKey);
      expect(docs.updateTransaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('Should call controller.delete', () => {
      routes.loadIn(router, docs, controller);

      expect(router.delete).toHaveBeenCalledTimes(1);
      expect(router.delete).toHaveBeenCalledWith(`/:${controller.paramIdKey}`, 'DEL');
      expect(controller.del).toHaveBeenCalledTimes(1);
      expect(controller.del).toHaveBeenCalledWith(ctx, controller.paramIdKey);
      expect(docs.deleteTransaction).toHaveBeenCalledTimes(1);
    });
  });
});
