const tasksRepo = require('./task.memory.repository');

const getTasksByBordId = bordId => tasksRepo.getTasksByBordId(bordId);

const get = ({ boardId, taskId }) => tasksRepo.get({ boardId, taskId });

const update = ({ boardId, taskId, updatedProperties }) =>
  tasksRepo.update({ boardId, taskId, updatedProperties });

const create = newTask => tasksRepo.create(newTask);

const deletebyId = ({ boardId, taskId }) =>
  tasksRepo.deletebyId({ boardId, taskId });

const deleteTasksByBoardId = boardId => tasksRepo.deleteTasksByBoardId(boardId);

const unassignTaskByUserId = removedUserId =>
  taskRepo.unassignTaskByUserId(removedUserId);

module.exports = {
  getTasksByBordId,
  get,
  update,
  create,
  deletebyId,
  deleteTasksByBoardId,
  unassignTaskByUserId
};
