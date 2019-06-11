const { BeeModel } = require('@beetech/bee-server-entities');
const { crypter: { keys: cypterKeys } } = require('../../../../../config/settings');
const { tables } = require('../../../../common/enum-helper');

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
    amount: {
      type: 'decimal',
    },
    currency: {
      type: 'string',
      isRequired: true,
      maxLength: 3,
      minLength: 3
    },
    date: {
      type: 'string',
      isRequired: true
    },
    purposeId: {
      type: 'integer',
      isRequired: true
    },
    purposeName: {
      type: 'string',
      excludeFromView: true,
      join: {
        field: 'name',
        collection: tables.purpose,
        on: {
          from: 'id',
          to: 'purposeId'
        }
      }
    },
    customer: {
      type: 'object',
      required: true,
      title: 'Customer',
      properties: {
        documentNumber: {
          type: 'string',
          isRequired: true,
        },
        name: {
          type: 'string',
          isRequired: true,
        },
        nature: {
          type: 'string',
          isRequired: true,
          enum: ['l', 'n']
        },
        country: {
          type: 'string',
          isRequired: true,
          maxLength: 3,
          minLength: 3
        },
        addressLine: {
          type: 'string'
        },
      },
    },
    beneficiary: {
      type: 'object',
      required: true,
      title: 'Beneficiary',
      properties: {
        bankAccountCode: {
          type: 'string',
          isRequired: true,
        },
        name: {
          type: 'string',
          isRequired: true,
        },
        country: {
          type: 'string',
          isRequired: true,
          maxLength: 3,
          minLength: 3
        },
        customerDocumentNumber: {
          type: 'string'
        },
      },
    }
  },
});

const transaction = new BeeModel(modelGenerator);

module.exports = transaction;
