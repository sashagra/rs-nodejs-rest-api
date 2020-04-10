const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const logger = require('./logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.log(
    'info',
    `Запрос на адрес http://${req.headers.host}${req.url} тип ${
      req.method
    } с телом ${
      JSON.stringify(req.body) !== '{}' ? JSON.stringify(req.body) : 'пусто'
    } с параметрами ${
      JSON.stringify(req.query) !== '{}' ? JSON.stringify(req.query) : 'пусто'
    }`
  );
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    logger.info(`${req.originalUrl} sadasd`);
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

module.exports = app;
