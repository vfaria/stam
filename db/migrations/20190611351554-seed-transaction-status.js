const seed = require('../helper/insert');
const down = require('../helper/remove');
const {
  tables
} = require('../../src/common/enum-helper');

const values = require('./seeds/20190611351554-seed-transaction-status.json');

const table = tables.transactionStatus;

exports.up = db => seed(db, table, values);
exports.down = db => down(db, table, values);
