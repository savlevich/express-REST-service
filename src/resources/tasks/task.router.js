const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

// Get Tasks by boardId
router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getTasksByBordId(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Get Task by boardId and taskId
router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get({
      boardId: req.params.boardId,
      taskId: req.params.taskId
    });
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Create new task
router.route('/').post(async (req, res) => {
  const newTask = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.json(Task.toResponse(newTask));
});

// Update Task
router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update({
      boardId: req.params.boardId,
      taskId: req.params.taskId,
      updatedProperties: req.body
    });
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status('404').send(error.message);
  }
});

// Delete Task
router.route('/:taskId').delete(async (req, res) => {
  try {
    const removedTask = await tasksService.deletebyId({
      boardId: req.params.boardId,
      taskId: req.params.taskId
    });

    res.json(Task.toResponse(removedTask));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
