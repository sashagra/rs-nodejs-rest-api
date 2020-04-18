const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./app-services/logger');
const path = require('path');
const { connectToDB } = require('./app-services/db-client');

process
  // eslint-disable-next-line no-unused-vars
  .on('unhandledRejection', (reason, promise) => {
    logger.info(`Unhandled Rejection at Promise. ${reason}.`);
  })
  .on('uncaughtException', err => {
    logger.info(
      `Uncaught Exception thrown: ${err.message}. Check the log ${path.join(
        __dirname,
        'logs/exceptions.log'
      )}`
    );
  });
connectToDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
