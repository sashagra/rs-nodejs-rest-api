const uuid = require('uuid');
const mongoose = require('mongoose');

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
