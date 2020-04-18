const User = require('./user.model');

// const { users } = require('../../app-services/db-client');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const addUser = async user => {
  // users.push(new User(user));
  // return users[users.length - 1];
  return User.create(user);
};

const updateUser = async user => {
  return User.findOneAndUpdate({ _id: user.id }, user);
  // const allUsers = await getAll();
  // const userIndex = allUsers.findIndex(el => el.id === user.id);
  // if (userIndex >= 0) {
  //   const oldUser = allUsers[userIndex];
  //   const newUser = { ...oldUser, ...user };
  //   allUsers.splice(userIndex, 1, newUser);
  //   return newUser;
  // }
  // return;
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id });
  // const allUsers = await getAll();
  // const userIndex = allUsers.findIndex(el => el.id === id);
  // if (userIndex >= 0) {
  //   allUsers.splice(userIndex, 1);
  //   return true;
  // }
  // return false;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
