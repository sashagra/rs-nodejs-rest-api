const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { responseHandler } = require('../../app-services/error-handler');

router.use(
  '/:id/tasks/',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardsService.addBoard(req.body);
    if (newBoard) {
      res.json(newBoard);
    } else {
      const response = responseHandler(400, 'Bad request', res);
      response();
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.json(board);
    } else {
      const response = responseHandler(404, 'Board not found', res);
      response();
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.json(board);
    } else {
      const response = responseHandler(400, 'Bad request', res);
      response();
    }
  })
  .delete(async (req, res) => {
    if (await boardsService.deleteBoard(req.params.id)) {
      res.status(204).end();
    } else {
      const response = responseHandler(404, 'Board not found', res);
      response();
    }
  });

module.exports = router;
