const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

class AppError {
  constructor() {
    this.status = BAD_REQUEST;
    this.message = getStatusText(this.status);
  }
}

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

module.exports = { errorHandler, AppError };
