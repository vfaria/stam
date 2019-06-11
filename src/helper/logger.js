const beeLogger = require('@beetech/bee-logger');
const packageJson = require('../../package.json');
const { logs: { level, send } } = require('../../config/settings');

const env = process.env.NODE_ENV;

const opts = {
  name: `${packageJson.name}-${env}-log`,
  level,
  sendToBeelog: send === 'true'
};
const logger = beeLogger.createLogger(opts);

module.exports = logger;
