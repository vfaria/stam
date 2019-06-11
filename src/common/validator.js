const validator = require('@beetech/bee-sting').default;
const { BeeError } = require('@beetech/bee-server-entities');
const { model } = require('./errors/error-codes');

function parseErrors(validatorErrors = []) {
  if (validatorErrors instanceof Error) {
    throw validatorErrors;
  }

  const error = new BeeError({ message: 'Invalid entity' });

  validatorErrors.forEach((err) => {
    if (err instanceof BeeError) {
      error.addErrors(err.errors.map(e => ({
        code: e.code,
        message: e.message,
        field: e.field
      })));
    } else if (err instanceof Error) {
      throw err;
    } else {
      error.add({
        code: model.VALIDATION_ERROR,
        message: err.message,
        field: err.field
      });
    }
  });

  return error;
}

module.exports = {
  validate: async (data, validations, opts = {}) => {
    const options = {
      language: 'en-US',
      ...opts
    };

    try {
      const validation = await validator.validate(data, validations, options);

      return validation;
    } catch (validatorErrors) {
      const errors = parseErrors(validatorErrors);

      throw errors;
    }
  }
};
