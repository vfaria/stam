const httpStatus = require('http-status-codes');
const errorCodes = require('../common/errors/error-codes');

const responseErrorSchema = {
  type: 'array',
  items: {
    title: 'ResponseError',
    type: 'object',
    properties: {
      code: {
        type: 'string'
      },
      message: {
        type: 'string'
      },
      field: {
        type: 'string'
      }
    }
  }
};

function responses({
  statusCode,
  description,
  xIdDescription,
  errorExample = {},
  errorsExample,
}) {
  const responseStructures = {
    [httpStatus.CREATED]: {
      description: description || 'The resource was created',
      headers: {
        'x-id': {
          description: xIdDescription || 'Resource id',
          schema: {
            type: 'string',
          }
        }
      }
    },
    [httpStatus.NO_CONTENT]: {
      description: description || 'No Content'
    },
    [httpStatus.NOT_FOUND]: {
      description: description || 'Resource not found',
      content: {
        'application/json': {
          schema: responseErrorSchema,
          example: errorsExample || {
            code: errorExample.code || errorCodes.generic.NOT_FOUND,
            message: errorExample.message || 'Not Found'
          },
        },
      },
    },
    [httpStatus.CONFLICT]: {
      description: description || 'Conflict with target resource',
      content: {
        'application/json': {
          schema: responseErrorSchema,
          example: errorsExample || {
            code: errorExample.code || errorCodes.generic.CONFLICT,
            message: errorExample.message || 'Conflict'
          }
        },
      },
    },
    [httpStatus.UNPROCESSABLE_ENTITY]: {
      description: description || 'Unprocessable Entity',
      content: {
        'application/json': {
          schema: responseErrorSchema,
          example: errorsExample || [{
            code: errorExample.code || errorCodes.generic.UNPROCESSABLE_ENTITY,
            message: errorExample.message || 'Unprocessable entity'
          }]
        }
      }
    },
    [httpStatus.FAILED_DEPENDENCY]: {
      description: description || 'Failed Dependecy',
      content: {
        'application/json': {
          schema: responseErrorSchema,
          example: errorsExample || {
            code: errorExample.code || errorCodes.generic.FAILED_DEPENDENCY,
            message: errorExample.message || 'Failed Dependecy'
          }
        }
      },
    }
  };

  return responseStructures[statusCode];
}

const headers = {
  preferReturn: {
    name: 'Prefer',
    in: 'header',
    description: 'Define the request payload return',
    required: false,
    schema: {
      type: 'string',
      enum: ['return-minimal', 'return-representation'],
      default: 'return-minimal',
    },
  }
};

const queryStrings = {
  envelope: {
    name: 'envelope',
    in: 'query',
    description: 'Decides if the return is enveloped',
    required: false,
    schema: {
      type: 'boolean'
    },
  },
  perPage: {
    name: 'per_page',
    in: 'query',
    description: 'Defines number of items per page',
    required: false,
    schema: {
      type: 'number'
    }
  },
  page: {
    name: 'page',
    in: 'query',
    description: 'Defines the page to be shown',
    required: false,
    schema: {
      type: 'number',
    }
  },
  sort: {
    name: 'sort',
    in: 'query',
    description: 'Set sorting field as ASC. Apply "-" before field name to set DESC',
    required: false,
    schema: {
      type: 'string',
    }
  },
  fields: {
    name: 'fields',
    in: 'query',
    description: 'Defines the fields to be shown separeted by comma',
    required: false,
    schema: {
      type: 'string',
    }
  },
  filter: {
    name: 'filter',
    in: 'query',
    description: `Filters.
    Filter: name LIKE 'marcos' or 'marcus' and age equals to 24 and gender different from female.
    Example: ?filter[%name]=marcos&filter[%name]=marcus&filter[age]=24&filter[!gender]=female`,
    required: false,
    schema: {
      example: '?filter[%name]=marcos&filter[%name]=marcus&filter[age]=24&filter[!gender]=female',
      type: 'string',
    },
  }
};

queryStrings.getAll = [
  queryStrings.envelope,
  queryStrings.fields,
  queryStrings.filter,
  queryStrings.page,
  queryStrings.perPage,
  queryStrings.sort
];

const helper = {
  responses,
  headers,
  queryStrings,
};

module.exports = helper;
