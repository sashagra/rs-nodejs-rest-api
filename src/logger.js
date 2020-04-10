const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'silly',
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({
      level: 'error',
      filename: `${__dirname}/logs/error.log`
    }),
    new transports.File({
      level: 'info',
      filename: `${__dirname}/logs/info.log`
    })
  ]
});

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
