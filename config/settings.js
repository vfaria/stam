const env = require('env-var');

const required = process.env.NODE_ENV !== 'test';

const settings = Object.freeze({
  errorAcronym: 'STM',
  port: env.get('STAM_PORT').required(required).asIntPositive(),
  url: env.get('STAM_URL').required(required).asString(),
  docs: {
    docsPath: '/v1/monitoring/docs.json',
    tokenPath: '/oauth/token',
    apiHost: env.get('STAM_URL').required(required).asString()
  },
  logs: {
    level: env.get('STAM_LOG_LEVEL').required(required).asString(),
    send: env.get('STAM_SEND_LOGS').required(required).asBool()
  },
  crypter: {
    secret: 'h0n3y',
    algorithm: 'bf',
    keys: {
      transaction: 'transaction',
    }
  },
  localization: {
    languages: ['en-US']
  },
  database: {
    driver: 'mysql2',
    user: env.get('STAM_DB_USERNAME').required(required).asString(),
    port: env.get('STAM_DB_PORT').required(required).asIntPositive(),
    password: env.get('STAM_DB_PASSWORD').required(required).asString(),
    host: env.get('STAM_DB_HOST').required(required).asString(),
    database: env.get('STAM_DB_DATABASE').required(required).asString(),
  }
});

module.exports = settings;
