const boardsRepo = require('./board.memory.repository');
const { deleteTasks } = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const addBoard = board => {
  // if (!board.title || !board.columns[0]) return;
  // for (const column of board.columns) {
  //   if (!column.title || !Number.isInteger(column.order)) return;
  // }
  return boardsRepo.addBoard(board);
};

const updateBoard = (id, board) => {
  return boardsRepo.updateBoard(id, board);
};

const deleteBoard = async id => {
  const isDeleted = boardsRepo.deleteBoard(id);
  if (isDeleted) {
    await deleteTasks(id);
  }
  return isDeleted;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
