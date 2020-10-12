const DB = require('../../common/inMemoryDB');
const Board = require('./board.model');

const getAll = async () => {
  const boards = await DB.getAllBoards();
  return boards;
};

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

const create = async newBoard => {
  const board = await DB.createBoard(newBoard);
  return board;
};
const update = async ({ id, updatedProperties }) => {
  const board = await DB.updateBoard({ id, updatedProperties });

  if (!board) {
    throw new Error(`The user with id: ${id} was not found`);
  }
  return board;
};

const deletebyId = async id => {
  DB.deleteTasksByBoardId(id);
  DB.deleteBoardById(id);
};

module.exports = { deletebyId, getAll, get, update, create };
