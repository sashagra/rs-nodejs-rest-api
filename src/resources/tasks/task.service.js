const tasksRepo = require('./task.memory.repository');

const addTask = task => {
  return tasksRepo.addTask(task);
};

const getAll = async boardId => {
  return await tasksRepo.getAll(boardId);
};

const getTask = async (boardId, taskId) => {
  const task = await tasksRepo.getTask(boardId, taskId);
  return task;
};

const updateTask = async (boardId, taskId, task) => {
  const updatedTask = await tasksRepo.updateTask(boardId, taskId, task);
  return updatedTask;
};

const deleteTask = async (boardId, taskId) => {
  return await tasksRepo.deleteTask(boardId, taskId);
};

module.exports = { addTask, getAll, getTask, updateTask, deleteTask };
