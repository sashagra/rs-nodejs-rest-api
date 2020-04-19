const { Board } = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({});
  if (!boards) {
    return;
  }
  return boards.map(board => Board.toResponse(board));
};

const getBoard = async id => {
  const board = await Board.findById({ _id: id });
  if (!board) {
    return;
  }
  return Board.toResponse(board);
};

const addBoard = async board => {
  board = await Board.create(board);
  if (!board) {
    return;
  }
  return Board.toResponse(board);
};
// {
//   const newBoard = new Board({
//     title: board.title,
//     columns: []
//   });
//   for (const column of board.columns) {
//     newBoard.columns.push(new Column(column));
//   }
//   boards.push(newBoard);
//   return newBoard;
// };

const updateBoard = async (id, board) => {
  const upadatedBoard = await Board.findOneAndUpdate({ _id: id }, board);
  if (!upadatedBoard) return;
  return Board.toResponse(await Board.findById({ _id: upadatedBoard._id }));
  // const boardIndex = boards.findIndex(i => i.id === id);
  // if (boardIndex === -1) return;
  // const currentBoard = await getBoard(id);
  // for (const column of board.columns) {
  //   if (!column.id) return;
  //   const currentColumn = currentBoard.columns.find(
  //     col => col.id === column.id
  //   );
  //   if (!currentColumn) continue;
  //   currentColumn.title = column.title;
  //   currentColumn.order = column.order;
  // }
  // currentBoard.id = board.id;
  // currentBoard.title = board.title;
  // return board;
};

const deleteBoard = async id => {
  return Board.deleteOne({ _id: id });
  // const boardIndex = boards.findIndex(i => i.id === id);
  // if (boardIndex === -1) return;
  // boards.splice(boardIndex, 1);
  // return true;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
