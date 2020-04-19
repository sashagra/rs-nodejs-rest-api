const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }

// class Column {
//   constructor({ id = uuid(), title = 'COLUMN', order = null } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }
const columnSchema = new mongoose.Schema({
  title: String,
  order: Number,
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  }
});

const boardSchema = new mongoose.Schema({
  title: String,
  columns: [columnSchema],
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  }
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return {
    id,
    title,
    // eslint-disable-next-line no-shadow
    columns: columns.map(({ id, title, order }) => ({
      id,
      title,
      order
    }))
  };
};

const Column = mongoose.model('Column', columnSchema);

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board, Column };
