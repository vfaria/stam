function removeIndex(db, table, indexName) {
  return db.removeIndex(table, indexName);
}

module.exports = removeIndex;
