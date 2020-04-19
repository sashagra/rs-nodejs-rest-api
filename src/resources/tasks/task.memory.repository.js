const Task = require('./task.model');
// const { tasks } = require('../../app-services/db-client');

const addTask = async task => {
  const newTask = await Task.create(task);
  if (!newTask) {
    return;
  }
  // const newTask = new Task(task);
  // tasks.push(newTask);
  return Task.toResponse(newTask);
};

const getAll = async boardId =>
  (await Task.find({ boardId })).map(Task.toResponse);
// {
//   return tasks.filter(task => task.boardId === boardId) || [];
// };

const getTask = async (boardId, id) => {
  const task = await Task.findById({ _id: id, boardId });
  if (!task) return;
  return Task.toResponse(task);
};

const updateTask = async (boardId, taskId, task) => {
  const upadatedTask = await Task.findOneAndUpdate(
    { _id: taskId, boardId },
    task
  );
  if (!upadatedTask) return;
  return Task.toResponse(await Task.findById({ _id: upadatedTask._id }));

  // const currentTask = await getTask(boardId, taskId);
  // const taskIndex = tasks.findIndex(el => el.id === taskId);
  // const updatedTask = { ...currentTask, ...task };
  // tasks.splice(taskIndex, 1, updatedTask);
  // return updatedTask;
};

const deleteTask = async (boardId, taskId) => {
  return Task.deleteOne({ _id: taskId, boardId });
  // const taskIndex = tasks.findIndex(task => task.id === taskId);
  // if (taskIndex === -1) return false;
  // tasks.splice(taskIndex, 1);
  // return true;
};

const unassignTasks = async userId => {
  await Task.updateMany({ userId }, { userId: null });
  return;
  // tasks.forEach(task => {
  //   if (task.userId === userId) task.userId = null;
  // });
};

const deleteTasks = async boardId => {
  return Task.deleteMany({ boardId });
  // const tasksToDelete = tasks.filter(task => task.boardId === boardId);
  // tasksToDelete.forEach(task => {
  //   const index = tasks.findIndex(el => el.id === task.id);
  //   tasks.splice(index, 1);
  // });
};

module.exports = {
  addTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignTasks,
  deleteTasks
};
