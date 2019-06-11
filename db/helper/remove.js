async function remove(db, table, values) {
  for (const value of values) {
    let sql = db.table(table).del();

    if (value) {
      sql = sql.where(value);
    }

    const run = async () => sql.then(result => result);

    await run(); // eslint-disable-line no-await-in-loop
  }
}

module.exports = remove;
