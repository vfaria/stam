const { modelPresenter: modelPresenterHelper } = require('@beetech/bee-server-model-presenter');

const Controller = require('../../../../core/Controller');
const Repository = require('../repositories/TransactionRepository');
const Service = require('../../../../core/Service');
const JSONSchema = require('../models/TransactionJSONSchema');
const knexInstance = require('../../../../common/knex-instance');
const neodeInstance = require('../../../../common/neode-instance');
const { tables } = require('../../../../common/enum-helper');
const { transactionModel, customerOGM, beneficiaryOGM } = require('../models');
const crypter = require('../../../../helper/crypter');
const logger = require('../../../../helper/logger');
const errors = require('../../../../common/errors/error-helper');

const paramIdKey = 'transactionId';

const modelPresenter = modelPresenterHelper({
  fieldsToBeEncrypted: transactionModel.fieldsToBeEncrypted,
  crypter,
  errors,
  logger,
});

function createTransactionRepository() {
  const repository = new Repository({
    knexInstance,
    neodeInstance: neodeInstance.with({ Customer: customerOGM, Beneficiary: beneficiaryOGM }),
    tableName: tables.transaction,
    JSONSchema: transactionModel.JSONSchema,
    validFields: transactionModel.validFields,
    inputFields: transactionModel.inputFields,
    joins: transactionModel.joins,
    modelPresenter
  });

  return repository;
}

function createTransactionService() {
  const repository = createTransactionRepository();
  const service = new Service({
    repository,
    JSONSchema
  });

  return service;
}

function createTransactionController() {
  const service = createTransactionService();
  const controller = new Controller({
    service,
    paramIdKey,
  });

  return controller;
}

const factories = {
  createTransactionController,
  createTransactionService
};

module.exports = factories;
