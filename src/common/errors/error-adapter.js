const httpStatus = require('http-status-codes');
const errorCodes = require('./error-codes');

const statusCodeFromErrorCode = Object.freeze({
  [errorCodes.generic.NOT_FOUND]: httpStatus.NOT_FOUND,
  [errorCodes.generic.UNPROCESSABLE_ENTITY]: httpStatus.UNPROCESSABLE_ENTITY,
  [errorCodes.transaction.ID_CONFLICT]: httpStatus.CONFLICT,
  [errorCodes.model.VALIDATION_ERROR]: httpStatus.UNPROCESSABLE_ENTITY,
});

module.exports = statusCodeFromErrorCode;
