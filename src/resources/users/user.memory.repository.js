const DB = require('../../common/inMemoryDB');
const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const users = await DB.getAllUsers();
  return users;
};

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }
  return user;
};

const create = async newUser => {
  const user = await DB.createUser(newUser);
  return user;
};
const update = async ({ id, updatedProperties }) => {
  const user = await DB.updateUser({ id, updatedProperties });
  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }
  return user;
};

const deletebyId = async id => {
  DB.deleteUserById(id);
};

module.exports = { deletebyId, getAll, get, update, create };
