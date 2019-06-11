const { errorAcronym } = require('../../../config/settings');

const errorCodes = Object.freeze({
  generic: {
    NOT_FOUND: `${errorAcronym}GNC0001`,
    UNPROCESSABLE_ENTITY: `${errorAcronym}GNC0002`,
  },
  transaction: {
    ID_CONFLICT: `${errorAcronym}TRA0001`,
  },
  model: {
    VALIDATION_ERROR: `${errorAcronym}MDL0001`
  },
});

module.exports = errorCodes;
