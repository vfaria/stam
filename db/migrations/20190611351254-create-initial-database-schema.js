const fs = require('fs');
const path = require('path');

exports.up = function (db) {
  const filePath = path.join(__dirname, '../scripts', '20190611351255-create-database.sql');

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  })
    .then(function (data) {
      return db.runSql(data);
    });
};

exports.down = db => db.runSql('DROP DATABASE stam');
