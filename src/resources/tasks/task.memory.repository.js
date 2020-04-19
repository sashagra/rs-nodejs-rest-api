const Task = require('./task.model');

const addTask = async task => {
  const newTask = await Task.create(task);
  return newTask ? Task.toResponse(newTask) : 0;
};

const getAll = async boardId =>
  (await Task.find({ boardId })).map(Task.toResponse);

const getTask = async (boardId, id) => {
  const task = await Task.findById({ _id: id, boardId });
  return task ? Task.toResponse(task) : 0;
};

const updateTask = async (boardId, taskId, task) => {
  const upadatedTask = await Task.findOneAndUpdate(
    { _id: taskId, boardId },
    task
  );
  return upadatedTask
    ? Task.toResponse(await Task.findById({ _id: upadatedTask._id }))
    : 0;
};

const deleteTask = async (boardId, taskId) =>
  (await Task.deleteOne({ _id: taskId, boardId })).n ? 1 : 0;

const unassignTasks = async userId => {
  await Task.updateMany({ userId }, { userId: null });
  return;
};

const deleteTasks = async boardId => Task.deleteMany({ boardId });

module.exports = {
  addTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignTasks,
  deleteTasks
};
