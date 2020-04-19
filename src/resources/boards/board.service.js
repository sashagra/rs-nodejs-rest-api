const boardsRepo = require('./board.memory.repository');
const { deleteTasks } = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const addBoard = board => boardsRepo.addBoard(board);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = async id => {
  const isDeleted = await boardsRepo.deleteBoard(id);
  if (isDeleted.n) {
    await deleteTasks(id);
    return isDeleted;
  }
  return;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
