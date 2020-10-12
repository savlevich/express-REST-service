const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const update = id => usersRepo.update(id);

const create = newUser => usersRepo.create(newUser);

const deletebyId = id => {
  taskRepo.unassignTaskByUserId(id);
  usersRepo.deletebyId(id);
};

module.exports = { getAll, get, update, create, deletebyId };
