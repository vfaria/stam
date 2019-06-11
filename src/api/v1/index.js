const path = require('path');
const fs = require('fs');

const logger = require('../../helper/logger');

const mainPrefix = 'v1/monitoring';

exports.loadIn = function loadIn(route) {
  const normalizedPath = path.join(__dirname);

  fs.readdirSync(normalizedPath).forEach((file) => {
    const context = require(`./${file}`); // eslint-disable-line global-require, import/no-dynamic-require

    if (!context || !context.loadIn) {
      logger.warn(`${file} must have loadIn function to receive router`);
    }

    if (file !== 'index.js') {
      try {
        const router = route.router();

        if (context.loadIn) {
          const prefix = context.loadIn(router);

          route.add(`/${prefix || ''}`, router);
        }
      } catch (e) {
        logger.error(e);
      }
    }
  });

  return mainPrefix;
};
