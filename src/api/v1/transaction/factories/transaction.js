const { modelPresenter: modelPresenterHelper } = require('@beetech/bee-server-model-presenter');

const Controller = require('../../../../core/Controller');
const Repository = require('../../../../core/RepositorySQL');
const Service = require('../../../../core/Service');
const JSONSchema = require('../models/transaction');
const knexInstance = require('../../../../common/knex-instance');
const { tables } = require('../../../../common/enum-helper');
const { transactionModel } = require('../models');
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
