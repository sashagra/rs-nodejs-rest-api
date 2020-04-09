const Task = require('./task.model');

const tasks = [
  new Task({
    title: 'INITIAL_TASK',
    order: 100,
    description: 'INITIAL_TASK_DESCRIPTION'
  })
];

const addTask = async task => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId) || [];
};

const getTask = async (boardId, taskId) => {
  const allTasks = await getAll(boardId);
  const task = allTasks.find(el => el.id === taskId);
  return task;
};

const updateTask = async (boardId, taskId, task) => {
  const currentTask = await getTask(boardId, taskId);
  const taskIndex = tasks.findIndex(el => el.id === taskId);
  const updatedTask = { ...currentTask, ...task };
  tasks.splice(taskIndex, 1, updatedTask);
  return updatedTask;
};

const deleteTask = async (boardId, taskId) => {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return false;
  tasks.splice(taskIndex, 1);
  return true;
};

const unassignTasks = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) task.userId = null;
  });
};

const deleteTasks = async boardId => {
  const tasksToDelete = tasks.filter(task => task.boardId === boardId);
  tasksToDelete.forEach(task => {
    const index = tasks.findIndex(el => el.id === task.id);
    tasks.splice(index, 1);
  });
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
