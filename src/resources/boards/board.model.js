const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = null } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = { Board, Column };
