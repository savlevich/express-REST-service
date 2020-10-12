const uuid = require('uuid');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const Column = require('../resources/columns/column.model');

const boardId = uuid();
const columnId = uuid();
const userId = uuid();

const newUser = new User({ id: userId });
const newTask = new Task({ columnId, boardId, userId });
const newColumn = new Column({ id: columnId });
const newBoard = new Board({ id: boardId, columns: [newColumn] });

const DB = {
  users: [],
  column: [],
  boards: [],
  tasks: []
};

DB.users.push(newUser);
DB.boards.push(newBoard);
DB.tasks.push(newTask);
DB.column.push(newColumn);

// Users

const getAllUsers = async () => {
  return DB.users;
};

const getUser = async id => {
  return DB.users.find(user => user.id === id);
};

const createUser = async newUser => {
  DB.users.push(newUser);
  const user = await getUser(newUser.id);
  return user;
};

const updateUser = async ({ id, updatedProperties }) => {
  const index = DB.users.findIndex(el => el.id === id);

  if (index < 0) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  let element = DB.users[index];
  element = Object.assign(element, updatedProperties);

  const user = await getUser(id);
  return user;
};

const deleteUserById = async id => {
  const index = DB.users.findIndex(user => user.id === id);

  if (index < 0) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  DB.users.splice(index, 1);
  const user = await getUser(id);
  return user;
};

// Boards

const getAllBoards = async () => {
  return DB.boards;
};

const getBoard = async id => {
  return DB.boards.find(board => board.id === id);
};

const createBoard = async newBoard => {
  DB.boards.push(newBoard);
  const board = await getBoard(newBoard.id);
  return board;
};

const updateBoard = async ({ id, updatedProperties }) => {
  const index = DB.boards.findIndex(el => el.id === id);

  if (index < 0) {
    throw new Error(`The board with id: ${id} was not found`);
  }

  let element = DB.boards[index];
  element = Object.assign(element, updatedProperties);

  const board = await getBoard(id);
  return board;
};

const deleteBoardById = async id => {
  const index = DB.boards.findIndex(board => board.id === id);

  if (index < 0) {
    throw new Error(`The board with id: ${id} was not found`);
  }

  DB.boards.splice(index, 1);

  const board = await getBoard(id);
  return board;
};

// Tasks

const getTasksByBordId = async boardId => {
  return DB.tasks.filter(task => task.boardId === boardId);
};

const getTask = async ({ boardId, taskId }) => {
  return DB.tasks.find(task => task.id === taskId && task.boardId === boardId);
};

const createTask = async newTask => {
  await DB.tasks.push(newTask);
  const task = await getTask({ boardId: newTask.boardId, taskId: newTask.id });
  return task;
};

const updateTask = async ({ boardId, taskId, updatedProperties }) => {
  const index = DB.tasks.findIndex(el => el.id === taskId);

  if (index < 0) {
    throw new Error(`The board with id: ${taskId} was not found`);
  }

  let element = DB.tasks[index];
  element = Object.assign(element, updatedProperties);

  const task = await getTask({ boardId, taskId });
  return task;
};

const deleteTaskById = async ({ boardId, taskId }) => {
  const index = DB.tasks.findIndex(task => task.id === taskId);

  if (index < 0) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }

  DB.tasks.splice(index, 1);

  return true;
};

const deleteTasksByBoardId = async boardId => {
  DB.tasks = DB.tasks.filter(task => task.boardId !== boardId);
};

const unassignTaskByUserId = async removedUserId => {
  return DB.tasks.forEach(task => {
    if (task.userId === removedUserId) {
      task.userId = null;
    }
  });
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUserById,
  // Boards
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoardById,
  deleteTasksByBoardId,
  // Tasks
  getTasksByBordId,
  getTask,
  createTask,
  updateTask,
  deleteTaskById,
  unassignTaskByUserId
};
