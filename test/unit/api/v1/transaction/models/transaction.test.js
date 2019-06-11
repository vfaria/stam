const transactionModel = require('../../../../../../src/api/v1/transaction/models/transaction');
const { crypter: { keys: cypterKeys } } = require('../../../../../../config/settings');
const { tables, transactionStatus } = require('../../../../../../src/common/enum-helper');

describe('Transaction model parser', () => {
  const expectedJSONSchema = {
    title: 'Transaction',
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      name: {
        type: 'string',
      },
      statusId: {
        type: 'integer',
        enum: Object.values(transactionStatus).map(({ value }) => value)
      },
      statusName: {
        type: 'string',
        enum: Object.values(transactionStatus).map(({ name }) => name)
      },
    },
    required: ['statusId'],
  };

  const expectedFieldsToBeEncrypted = [{
    field: 'id',
    key: cypterKeys.transaction
  }];

  const expectedInputFields = ['statusId', 'name'];

  const expectedValidFields = ['id', 'statusId', 'statusName', 'name'];

  const expectedJoins = [{
    alias: 'statusName',
    collection: tables.transactionStatus,
    field: 'name',
    on: {
      from: 'id',
      to: 'status_id'
    }
  }];

  it('Should create JSONSchema from transaction model', async () => {
    expect(transactionModel.JSONSchema).toEqual(expectedJSONSchema);
  });

  it('Should create fieldsToBeEncrypted from transaction model', async () => {
    expect(transactionModel.fieldsToBeEncrypted).toEqual(expectedFieldsToBeEncrypted);
  });

  it('Should create inputFields from transaction model', async () => {
    expect(transactionModel.inputFields).toEqual(expectedInputFields);
  });

  it('Should create validFields from transaction model', async () => {
    expect(transactionModel.validFields).toEqual(expectedValidFields);
  });

  it('Should create joins from transaction model', async () => {
    expect(transactionModel.joins).toEqual(expectedJoins);
  });
});
