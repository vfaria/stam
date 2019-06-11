const { BeeModel } = require('@beetech/bee-server-entities');
const { crypter: { keys: cypterKeys } } = require('../../../../../config/settings');
const { tables, transactionStatus } = require('../../../../common/enum-helper');

const modelGenerator = Object.freeze({
  title: 'Transaction',
  properties: {
    id: {
      type: 'string',
      encrypt: {
        key: cypterKeys.transaction
      },
      excludeFromView: true
    },
    statusId: {
      type: 'integer',
      isRequired: true,
      enum: Object.values(transactionStatus).map(({ value }) => value)
    },
    statusName: {
      type: 'string',
      excludeFromView: true,
      join: {
        field: 'name',
        collection: tables.transactionStatus,
        on: {
          from: 'id',
          to: 'status_id'
        }
      },
      enum: Object.values(transactionStatus).map(({ name }) => name)
    },
    name: {
      type: 'string',
    }
  },
});

const transaction = new BeeModel(modelGenerator);

module.exports = transaction;
