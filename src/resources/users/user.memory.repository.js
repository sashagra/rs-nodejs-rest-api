const User = require('./user.model');

const getAll = () => User.find({});

const getUser = id => User.findById(id);

const addUser = user => User.create(user);

const updateUser = user => User.findOneAndUpdate({ _id: user.id }, user);

const deleteUser = id => User.deleteOne({ _id: id });

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
