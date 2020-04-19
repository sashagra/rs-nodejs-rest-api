const usersRepo = require('./user.memory.repository');
const { unassignTasks } = require('../tasks/task.memory.repository');
const User = require('./user.model');
const { responseHandler } = require('../../app-services/error-handler');

const getAll = async res => {
  const users = await usersRepo.getAll();
  if (users.length < 1) {
    const response = responseHandler(404, 'Users DB is empty', res);
    response();
  } else {
    res.status(200).json(users.map(User.toResponse));
  }
};

const getUser = async (id, res) => {
  const user = await usersRepo.getUser(id);
  if (!user) {
    const response = responseHandler(404, 'User not found', res);
    response();
  } else {
    res.status(200).json(User.toResponse(user));
  }
};

const addUser = async (user, res) => {
  const newUser = await usersRepo.addUser(user);
  if (!newUser) {
    const response = responseHandler(400, 'Bad request', res);
    response();
  } else {
    res.status(200).json(User.toResponse(newUser));
  }
};

const updateUser = async user => {
  user = await usersRepo.updateUser(user);
  return user ? usersRepo.getUser(user.id) : 0;
};

const deleteUser = async id => {
  const isDeleted = await usersRepo.deleteUser(id);
  if (isDeleted.n > 0) {
    await unassignTasks(id);
  }
  return isDeleted.n;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
