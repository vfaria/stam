const createDatabaseScript = require('../scripts/create-database.sql');

exports.up = db => db.runSql(createDatabaseScript);

exports.down = db => db.runSql('DROP DATABASE stam');
