const User = require('./user.model');

const users = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' }),
  new User({ name: 'name3', login: 'login3', password: 'password3' })
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getUser = async id => {
  return (await getAll()).find(user => user.id === id);
};

const addUser = async user => {
  users.push(new User(user));
  return users[users.length - 1];
};

const updateUser = async user => {
  const allUsers = await getAll();
  const userIndex = allUsers.findIndex(el => el.id === user.id);
  if (userIndex >= 0) {
    const oldUser = allUsers[userIndex];
    const newUser = { ...oldUser, ...user };
    allUsers.splice(userIndex, 1, newUser);
    return newUser;
  }
  return;
};

const deleteUser = async id => {
  const allUsers = await getAll();
  const userIndex = allUsers.findIndex(el => el.id === id);
  if (userIndex >= 0) {
    allUsers.splice(userIndex, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
