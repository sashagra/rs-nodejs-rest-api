const { Board } = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({});
  return boards ? boards.map(board => Board.toResponse(board)) : 0;
};

const getBoard = async id => {
  const board = await Board.findById({ _id: id });
  return board ? Board.toResponse(board) : 0;
};

const addBoard = async board => {
  board = await Board.create(board);
  return board ? Board.toResponse(board) : 0;
};

const updateBoard = async (id, board) => {
  const upadatedBoard = await Board.findOneAndUpdate({ _id: id }, board);
  return upadatedBoard
    ? Board.toResponse(await Board.findById({ _id: upadatedBoard._id }))
    : 0;
};

const deleteBoard = async id => Board.deleteOne({ _id: id });

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
