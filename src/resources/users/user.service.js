const usersRepo = require('./user.memory.repository');
const { unassignTasks } = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const addUser = user => {
  if (!user.name || !user.login || !user.password) {
    return;
  }
  return usersRepo.addUser(user);
};

const updateUser = user => {
  if (!user.name || !user.login || !user.password) {
    return;
  }
  return usersRepo.updateUser(user);
};

const deleteUser = async id => {
  const isDeleted = usersRepo.deleteUser(id);
  if (isDeleted) {
    await unassignTasks(id);
  }
  return isDeleted;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
