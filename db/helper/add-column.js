function addColumn(db, tableName, columnName, columnType) {
  return db.addColumn(tableName, columnName, columnType);
}

exports.addColumn = addColumn;

