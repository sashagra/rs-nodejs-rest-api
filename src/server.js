const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./app-services/logger');

process
  // eslint-disable-next-line no-unused-vars
  .on('unhandledRejection', (reason, promise) => {
    logger.info(`Unhandled Rejection at Promise. ${reason}`);
  })
  .on('uncaughtException', err => {
    logger.info(`Uncaught Exception thrown: ${err.message}`);
  });

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
