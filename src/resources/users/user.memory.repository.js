const User = require('./user.model');

const users = [
  new User({ name: 'sasha', login: 'alex', password: 'alehandro' }),
  new User({ name: 'masha', login: 'maria', password: 'mashka77' }),
  new User({ name: 'dasha', login: 'daria', password: 'dashka99' })
];

const getAll = async () => {
  return users;
};

const getUser = async id => {
  const usersBD = await getAll();
  const user = usersBD.find(c => c.id === id);
  return user;
};

const addUser = async user => {
  users.push(new User(user));
  return users[users.length - 1];
};

const updateUser = async user => {
  const usersBD = await getAll();
  const userIndex = usersBD.findIndex(el => el.id === user.id);
  if (userIndex >= 0) {
    const oldUser = usersBD[userIndex];
    const newUser = { ...oldUser, ...user };
    usersBD.splice(userIndex, 1, newUser);
    return newUser;
  }
  return;
};

const deleteUser = async id => {
  const usersBD = await getAll();
  const idx = usersBD.findIndex(el => el.id === id);
  if (idx >= 0) {
    usersBD.splice(idx, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
