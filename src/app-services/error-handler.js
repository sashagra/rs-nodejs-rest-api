const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');
const { logger } = require('./logger');

class AppError {
  constructor(status) {
    this.status = status || BAD_REQUEST;
    this.message = getStatusText(this.status || BAD_REQUEST);
  }
}

const responseHandler = (resCode, resMessage, res) => {
  logger.error(
    `Response to client with code ${resCode}, message: ${resMessage}`
  );
  return () => {
    res.status(resCode).send(resMessage);
  };
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next(err);
};

module.exports = { errorHandler, responseHandler, AppError };
