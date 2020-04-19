const tasksRepo = require('./task.memory.repository');

const addTask = task => tasksRepo.addTask(task);

const getAll = async boardId => tasksRepo.getAll(boardId);

const getTask = async (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const updateTask = async (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const deleteTask = async (boardId, taskId) =>
  tasksRepo.deleteTask(boardId, taskId);

module.exports = { addTask, getAll, getTask, updateTask, deleteTask };
