const router = require('express').Router();
const tasksService = require('./task.service');
const { responseHandler } = require('../../app-services/error-handler');

router
  .route('/')
  .post(async (req, res) => {
    const newTask = await tasksService.addTask({
      ...req.body,
      boardId: req.boardId
    });
    if (newTask) {
      res.json(newTask);
    } else {
      const response = responseHandler(400, 'Bad request', res);
      response();
    }
  })
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    if (tasks.length < 1) {
      const response = responseHandler(404, 'Tasks not found', res);
      response();
    } else {
      res.json(tasks);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.boardId, req.params.id);
    if (task) {
      res.json(task);
    } else {
      const response = responseHandler(404, 'Task not found', res);
      response();
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.updateTask(
      req.boardId,
      req.params.id,
      req.body
    );
    if (task) {
      res.json(task);
    } else {
      const response = responseHandler(404, 'Task not found', res);
      response();
    }
  })
  .delete(async (req, res) => {
    if (await tasksService.deleteTask(req.boardId, req.params.id)) {
      res.status(204).end();
    } else {
      const response = responseHandler(404, 'Task not found', res);
      response();
    }
  });

module.exports = router;
