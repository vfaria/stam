const app = require('./app');
const logger = require('./helper/logger');
const settings = require('../config/settings');

const PORT = settings.port || 3000;

app.listen(
  PORT,
  () => logger.info(`server listening on port ${PORT}`)
);
