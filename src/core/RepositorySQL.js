const { BeeSQLRepository } = require('@beetech/bee-server-entities');
const validator = require('../common/validator');
const errorHelper = require('../common/errors/error-helper');


class RepositorySQL extends BeeSQLRepository {
  constructor(params = {}) {
    const { errorContext } = params;
    const errorDict = params.errorDict || errorHelper;

    const errors = errorDict[errorContext] || {};

    const {
      notFound: notFoundError = errorHelper.notFound,
      duplicateKey: duplicateKeyError = errors.duplicateKey,
      mismatchType: mismatchTypeError = errors.mismatchType,
      tooLongValue: tooLongValueError = errors.tooLongValue,
      notNullable: notNullableError = errors.notNullable,
      noDefaultValue: noDefaultValueError = errors.noDefaultValue,
      foreignKey: foreignKeyError = errors.foreignKey,
      fieldsMissingField: fieldsMissingFieldError = errors.fieldsMissingField,
      filterMissingField: filterMissingFieldError = errors.filterMissingField,
      sortingMissingField: sortingMissingFieldError = errors.sortingMissingField
    } = errorDict.generic || {};

    super({
      ...params,
      notFoundError,
      duplicateKeyError,
      mismatchTypeError,
      tooLongValueError,
      notNullableError,
      noDefaultValueError,
      foreignKeyError,
      fieldsMissingFieldError,
      filterMissingFieldError,
      sortingMissingFieldError,
      validator
    });
  }
}

module.exports = RepositorySQL;
