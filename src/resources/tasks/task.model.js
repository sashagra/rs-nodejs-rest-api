const uuid = require('uuid');
const mongoose = require('mongoose');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'TASK',
//     order = null,
//     description = 'TASK_DESCRIPTION',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static toResponse(task) {
//     const { id, title, order, description, userId } = task;
//     return { id, title, order, description, userId };
//   }
// }

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  order: Number,
  description: {
    type: String,
    default: ''
  },
  userId: String,
  boardId: String,
  columnId: String
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
