const router = require('express').Router();
const boardsService = require('./board.service');

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
      res.status(400).send('Bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Board not found');
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.json(board);
    } else {
      res.status(400).send('Bad request');
    }
  })
  .delete(async (req, res) => {
    if (await boardsService.deleteBoard(req.params.id)) {
      res.status(204).end();
    } else {
      res.status(404).send('Board not found');
    }
  });

module.exports = router;
