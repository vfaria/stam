const path = require('path');
const logger = require('../../../helper/logger');

const mainPrefix = '';

exports.loadIn = function loadIn(route) {
  const router = route.router();
  try {
    const routes = require('./routes'); // eslint-disable-line global-require, import/no-dynamic-require

    if (!routes || !routes.loadIn) {
      const dir = path.join(__dirname, './routes');

      logger.warn(`${dir} must have loadIn function to receive router`);
    }

    const prefix = routes.loadIn(router);

    route.add(`/${prefix || ''}`, router);
  } catch (err) {
    logger.error({ err });
  }

  return mainPrefix;
};
