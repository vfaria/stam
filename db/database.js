const path = require('path');
const settings = require('../config/settings');

const config = {
  development: {
    client: settings.database.driver,
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations')
    },
    connection: settings.database
  }
};

config.production = config.development;
config.homologation = config.development;

module.exports = config;
