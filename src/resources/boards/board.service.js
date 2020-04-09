const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const addBoard = board => {
  if (!board.title || !board.columns[0]) return;
  for (const column of board.columns) {
    if (!column.title || !Number.isInteger(column.order)) return;
  }
  return boardsRepo.addBoard(board);
};

const updateBoard = (id, board) => {
  return boardsRepo.updateBoard(id, board);
};

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
