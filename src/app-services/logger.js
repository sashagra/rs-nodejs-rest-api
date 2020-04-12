const { createLogger, format, transports } = require('winston');
const path = require('path');
const { combine, timestamp, printf } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'silly',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  exitOnError: true,
  transports: [
    new transports.File({
      level: 'error',
      format: format.combine(format.uncolorize(), format.json()),
      filename: path.join(__dirname, '../logs/error.log')
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '../logs/info.log')
    })
  ],
  exceptionHandlers: [
    new transports.File({
      format: format.combine(format.uncolorize(), format.json()),
      filename: path.join(__dirname, '../logs/exceptions.log')
    })
  ]
});

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    })
  );
}

const loggerReqMiddleware = (req, res, next) => {
  logger.log(
    'info',
    `Запрос на адрес http://${req.headers.host}${req.url}, тип ${
      req.method
    }, с телом ${
      JSON.stringify(req.body) !== '{}' ? JSON.stringify(req.body) : 'пусто'
    }, с параметрами ${
      JSON.stringify(req.query) !== '{}' ? JSON.stringify(req.query) : 'пусто'
    }`
  );
  next();
};

const loggerErrMiddleware = (err, req, res, next) => {
  logger.error(
    `From loggerErrMiddleware ${res.statusCode} ${res.statusMessage}`
  );
  err++;
  next();
};

module.exports = { logger, loggerReqMiddleware, loggerErrMiddleware };