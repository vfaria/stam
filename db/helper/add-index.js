function addIndex(db, table, indexName, columns, isUnique = false) {
  return db.addIndex(table, indexName, columns, isUnique);
}

module.exports = addIndex;
