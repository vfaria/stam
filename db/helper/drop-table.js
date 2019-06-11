function dropTable(db, tableName) {
  return db.schema.dropTable(tableName);
}

module.exports = dropTable;
