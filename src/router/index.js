const path = require('path');
const fs = require('fs');
const logger = require('../helper/logger');

exports.loadIn = function loadIn(route) {
  const normalizedPath = path.join(__dirname, '../api');

  fs.readdirSync(normalizedPath).forEach((file) => {
    const api = require(`../api/${file}`); // eslint-disable-line global-require, import/no-dynamic-require

    if (!api || !api.loadIn) {
      logger.warn(`${file} must have loadIn function to receive router`);
    }

    if (file !== 'index.js' && api && api.loadIn) {
      const router = route.router();
      const prefix = api.loadIn(router);
      route.add(`/${prefix || ''}`, router);
    }
  });
};
