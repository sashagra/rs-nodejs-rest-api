const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const { loginRouter, loginAccess } = require('./app-services/authentication');
const boardRouter = require('./resources/boards/board.router');
const {
  loggerReqMiddleware,
  loggerErrMiddleware
} = require('./app-services/logger');
const { errorHandler } = require('./app-services/error-handler');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(loggerReqMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', loginAccess, userRouter);
app.use('/boards', loginAccess, boardRouter);

// Error handler
app.use(errorHandler, loggerErrMiddleware);

module.exports = app;
