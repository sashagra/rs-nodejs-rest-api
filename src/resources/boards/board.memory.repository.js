const { Board, Column } = require('./board.model');

const boards = [
  new Board({
    title: 'Моя доска',
    columns: [
      new Column({ title: 'column1', order: 0 }),
      new Column({ title: 'column2', order: 1 }),
      new Column({ title: 'column3', order: 2 })
    ]
  }),
  new Board({
    title: 'Моя вторая доска',
    columns: [
      new Column({ title: 'column4', order: 0 }),
      new Column({ title: 'column5', order: 1 }),
      new Column({ title: 'column6', order: 2 })
    ]
  })
];

const getAll = async () => boards;

const getBoard = async id => (await getAll()).find(board => board.id === id);

const addBoard = async board => {
  const newBoard = new Board({
    title: board.title,
    columns: []
  });
  for (const column of board.columns) {
    newBoard.columns.push(new Column(column));
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, board) => {
  const boardIndex = boards.findIndex(i => i.id === id);
  if (boardIndex === -1) return;
  const currentBoard = await getBoard(id);
  for (const column of board.columns) {
    if (!column.id) return;
    const currentColumn = currentBoard.columns.find(
      col => col.id === column.id
    );
    if (!currentColumn) continue;
    currentColumn.title = column.title;
    currentColumn.order = column.order;
  }
  currentBoard.id = board.id;
  currentBoard.title = board.title;
  return board;
};

const deleteBoard = async id => {
  const boardIndex = boards.findIndex(i => i.id === id);
  if (boardIndex === -1) return;
  boards.splice(boardIndex, 1);
  return true;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
