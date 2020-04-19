const Task = require('../resources/tasks/task.model');
const { Board, Column } = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const { logger } = require('./logger');
const mongoose = require('mongoose');

const users = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' }),
  new User({ name: 'name3', login: 'login3', password: 'password3' })
];

const boards = [
  new Board({
    title: 'board1',
    columns: [
      new Column({ title: 'column1', order: 0 }),
      new Column({ title: 'column2', order: 1 }),
      new Column({ title: 'column3', order: 2 })
    ]
  }),
  new Board({
    title: 'board2',
    columns: [
      new Column({ title: 'column4', order: 0 }),
      new Column({ title: 'column5', order: 1 }),
      new Column({ title: 'column6', order: 2 })
    ]
  })
];

const tasks = [
  new Task({
    title: 'Task #1',
    order: 1,
    description: 'Desc'
  })
];

const connectToDB = fn => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    await db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    logger.info('MongoDB connection successful');
    fn();
  });
};

module.exports = { users, boards, tasks, connectToDB };
