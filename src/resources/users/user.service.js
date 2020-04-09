const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const addUser = user => {
  if (!user) {
    return;
  }
  return usersRepo.addUser(user);
};

const updateUser = user => {
  if (!user) {
    return;
  }
  return usersRepo.updateUser(user);
};

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
