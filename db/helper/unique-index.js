function uniqueIndex(db, {
  indexName,
  table,
  fields,
  where
}) {
  let sql = `CREATE UNIQUE INDEX ${indexName}
  ON ${table}
  (${fields.join(', ')}) `;
  if (where) {
    const whereClause = Object.keys(where)
      .map(f => `"${f}" = '${where[f]}'`)
      .join(' and ');
    sql += `WHERE ${whereClause};`;
  }

  return db.runSql(sql);
}

module.exports = uniqueIndex;
