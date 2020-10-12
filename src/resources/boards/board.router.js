const boardsRouter = require('express').Router();
const taskRouter = require('../tasks/task.router');
const Board = require('./board.model');
const boardsService = require('./board.service');

boardsRouter.use('/:boardId/tasks', taskRouter);

boardsRouter.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

boardsRouter.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

boardsRouter.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update({
      id: req.params.id,
      updatedProperties: req.body
    });
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status('404').send(error.message);
  }
});

boardsRouter.route('/').post(async (req, res) => {
  const newBoard = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(newBoard));
});

// When somebody DELETE Board, all its Tasks should be deleted as well.
boardsRouter.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deletebyId(req.params.id);
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = boardsRouter;
