function createTable(db, tableName) {
  return {
    then: cb => db.schema.createTable(tableName, table => cb(table))
  };
}

module.exports = createTable;
