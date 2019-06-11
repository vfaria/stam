function insert(db, tableName, values = []) {
  const promises = [];
  values.forEach(value => promises.push(db.table(tableName).insert(value)));

  return Promise.all(promises);
}

module.exports = insert;
