const Server = require('@beetech/bee-server-api');
const createErrorHelper = require('@beetech/bee-server-errors');
const heathCheck = require('@beetech/bee-server-health-check');
const logger = require('../helper/logger');
const knexInstance = require('../common/knex-instance');
const settings = require('../../config/settings');
const packageJSON = require('../../package.json');
const statusCodeFromErrorCode = require('../common/errors/error-adapter');
const routes = require('../router');
const { errorAcronym } = require('../../config/settings');

const { name, version, description } = packageJSON;
const errorHelper = createErrorHelper(errorAcronym);
const { docsPath, tokenPath, apiHost } = settings.docs;

const options = {
  name,
  version,
  description,
  logger,
  errorHelper,
  statusCodeFromErrorCode,
  docsPath,
  tokenPath,
  apiHost,
};

const app = new Server(options);

app.router.get('/', {
  ignoreRoute: true,
  handlers: [heathCheck({
    healthFn: async () => {
      await knexInstance.select(1);

      return { name, version };
    }
  })]
});

routes.loadIn(app.router);

module.exports = app;
