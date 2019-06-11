const knex = require('knex');
const moment = require('moment');

const {
  database
} = require('../../config/settings');

function typeCast(field, next) {
  if (field.type === 'TINY' && field.length === 1) {
    const value = field.string();

    return value
      ? (value === '1')
      : null;
  }

  if (field.type === 'NEWDECIMAL') {
    const value = field.string();

    return value
      ? parseFloat(value)
      : null;
  }

  if (field.type === 'DATE') {
    const value = field.string();

    return value
      ? moment(value).format('YYYY-MM-DD')
      : null;
  }

  return next();
}

const knexConf = {
  client: database.driver,
  connection: {
    host: database.host,
    user: database.user,
    port: database.port,
    password: database.password,
    database: database.database,
    typeCast
  },
};

const knexInstance = knex(knexConf);

module.exports = knexInstance;
