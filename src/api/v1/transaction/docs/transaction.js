
const validator = require('@beetech/bee-server-validator');
const { middleware: sanitizer } = require('@beetech/bee-server-sanitizer');
const httpStatus = require('http-status-codes');
const { model: { VALIDATION_ERROR } } = require('../../../../common/errors/error-codes');
const { responses, headers, queryStrings } = require('../../../../router/helper');
const { transactionModel } = require('../models');
const errors = require('../../../../common/errors/error-helper');

const tags = ['Transaction'];

const schemaValidator = validator(VALIDATION_ERROR, transactionModel.JSONSchema);

const transactionBodyParameter = {
  required: true,
  content: {
    'application/json': {
      schema: transactionModel.JSONSchema
    }
  }
};

const transactionIdPathParameter = {
  in: 'path',
  required: true,
  description: 'Transaction Id',
  schema: {
    type: 'string'
  }
};

function createTransaction(handlers) {
  const middlewares = [sanitizer(transactionModel.validFields), schemaValidator];

  return {
    handlers: middlewares.concat(handlers),
    tags,
    summary: 'Create Transaction',
    description: 'Create Transaction',
    operationId: 'createTransaction',
    requestBody: transactionBodyParameter,
    parameters: [headers.preferReturn],
    responses: {
      [httpStatus.CREATED]: responses({ statusCode: httpStatus.CREATED }),
      [httpStatus.OK]: {
        description: 'OK',
        content: {
          'application/json': {
            schema: transactionModel.JSONSchema
          }
        }
      },
      [httpStatus.UNPROCESSABLE_ENTITY]: responses({
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        errorsExample: errors.generic.unprocessableEntity().errors
      })
    }
  };
}

function getTransaction(handlers) {
  return {
    handlers,
    tags,
    summary: 'Get Transaction',
    description: 'Gets Transaction',
    operationId: 'getTransaction',
    parameters: queryStrings.getAll,
    responses: {
      [httpStatus.OK]: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: transactionModel.JSONSchema
            }
          }
        }
      },
      [httpStatus.NOT_FOUND]: responses({
        statusCode: httpStatus.NOT_FOUND
      })
    }
  };
}

function getTransactionById({ handlers, transactionIdParamKey }) {
  return {
    handlers,
    tags,
    summary: 'Get Transaction by Id',
    description: 'Gets Transaction by Id',
    operationId: 'getTransactionById',
    parameters: [
      queryStrings.fields,
      { ...transactionIdPathParameter, name: transactionIdParamKey }
    ],
    responses: {
      [httpStatus.OK]: {
        description: 'OK',
        content: {
          'application/json': {
            schema: transactionModel.JSONSchema
          }
        }
      },
      [httpStatus.NOT_FOUND]: responses({
        statusCode: httpStatus.NOT_FOUND
      })
    }
  };
}

function updateTransaction({ handlers, transactionIdParamKey }) {
  const middlewares = [sanitizer(transactionModel.validFields), schemaValidator];

  return {
    handlers: middlewares.concat(handlers),
    tags,
    summary: 'Update Transaction',
    description: 'Updates Transaction',
    operationId: 'updateTransaction',
    requestBody: transactionBodyParameter,
    parameters: [
      headers.preferReturn,
      Object.assign({ name: transactionIdParamKey }, transactionIdPathParameter),
    ],
    responses: {
      [httpStatus.NO_CONTENT]: responses({
        statusCode: httpStatus.NO_CONTENT
      }),
      [httpStatus.NOT_FOUND]: responses({
        statusCode: httpStatus.NOT_FOUND
      }),
      [httpStatus.OK]: {
        description: 'OK',
        content: {
          'application/json': {
            schema: transactionModel.JSONSchema
          }
        }
      },
      [httpStatus.CONFLICT]: responses({
        statusCode: httpStatus.CONFLICT,
        errorExample: errors.transaction.idConflict('id').errors
      }),
    }
  };
}

function deleteTransaction({ handlers, transactionIdParamKey }) {
  return {
    handlers,
    tags,
    summary: 'Delete Transaction',
    description: 'Delete Transaction',
    operationId: 'deleteTransaction',
    parameters: [
      headers.preferReturn,
      Object.assign({ name: transactionIdParamKey }, transactionIdPathParameter),
    ],
    responses: {
      [httpStatus.NO_CONTENT]: responses({ statusCode: httpStatus.NO_CONTENT }),
      [httpStatus.OK]: {
        description: 'OK',
        content: {
          'application/json': {
            schema: transactionModel.JSONSchema
          }
        }
      },
      [httpStatus.CONFLICT]: responses({ statusCode: httpStatus.CONFLICT })
    }
  };
}

module.exports = {
  createTransaction,
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
