const { BeeError } = require('@beetech/bee-server-entities');
const errorCodes = require('./error-codes');

const errors = {
  generic: {
    notFound: () => new BeeError({
      message: 'Not found',
      code: errorCodes.generic.NOT_FOUND
    }),
    unprocessableEntity: field => new BeeError({
      message: 'Unprocessable entity',
      code: errorCodes.generic.UNPROCESSABLE_ENTITY,
      field
    }),
  },
  transaction: {
    idConflict: id => new BeeError({
      message: `Id ${id} currently does not exist`,
      code: errorCodes.transaction.ID_CONFLICT
    }),
  },
};

module.exports = errors;
