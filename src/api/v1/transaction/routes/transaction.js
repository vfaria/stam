const transactionDocs = require('../docs/transaction');
const factories = require('../factories/transaction');

const PREFIX = 'transaction';

const transactionController = factories.createTransactionController();

exports.loadIn = function loadIn(
  router,
  docs = transactionDocs,
  controller = transactionController
) {
  router
    .post('/', docs.createTransaction((...args) => controller.post(...args)))

    .get('/', docs.getTransaction((...args) => controller.get(...args)))

    .get(`/:${controller.paramIdKey}`, docs.getTransactionById({
      handlers: (...args) => controller.getById(...args),
      transactionIdParamKey: controller.paramIdKey
    }))

    .put(`/:${controller.paramIdKey}`, docs.updateTransaction({
      handlers: (...args) => controller.put(...args),
      transactionIdParamKey: controller.paramIdKey
    }))

    .delete(`/:${controller.paramIdKey}`, docs.deleteTransaction({
      handlers: (...args) => controller.del(...args),
      transactionIdParamKey: controller.paramIdKey
    }));

  return PREFIX;
};
