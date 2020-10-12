const DB = require('../../common/inMemoryDB');
const Task = require('./task.model');

const getTasksByBordId = async boardId => {
  const tasks = await DB.getTasksByBordId(boardId);
  if (!tasks) {
    throw new Error(`The tasks with bord id: ${boardId} were not found`);
  }

  return tasks;
};

const get = async ({ boardId, taskId }) => {
  const task = await DB.getTask({ boardId, taskId });
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

const create = async newTask => {
  const task = await DB.createTask(newTask);
  return task;
};
const update = async ({ boardId, taskId, updatedProperties }) => {
  const task = await DB.updateTask({ boardId, taskId, updatedProperties });

  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

const deletebyId = async ({ boardId, taskId }) => {
  const taskHasBeenRemoved = await DB.deleteTaskById({ boardId, taskId });

  if (!taskHasBeenRemoved) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return taskHasBeenRemoved;
};

const deleteTasksByBoardId = async boardId => {
  await DB.deleteTasksByBoardId(boardId);
};

const unassignTaskByUserId = async removedUserId => {
  await DB.unassignTaskByUserId(removedUserId);
};

module.exports = {
  getTasksByBordId,
  get,
  update,
  create,
  deletebyId,
  deleteTasksByBoardId,
  unassignTaskByUserId
};
