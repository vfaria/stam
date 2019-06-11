const createTable = require('../helper/create-table');
const dropTable = require('../helper/drop-table');
const { tables } = require('../../src/common/enum-helper');

const tableName = tables.transactionStatus;

exports.up = db => createTable(db, tableName)
  .then((table) => {
    const useTimestampType = false;
    const makeDefaultNow = true;

    table.integer('id').unsigned().primary();
    table.string('name', 45).notNull();
    table.dateTime('deleted_at').notNull().defaultTo('0000-00-00 00:00:00');
    table.timestamps(useTimestampType, makeDefaultNow);
  });

exports.down = db => dropTable(db, tableName);
