function removeColumn(db, tableName, columnName) {
  return db.removeColumn(tableName, columnName);
}

exports.removeColumn = removeColumn;
