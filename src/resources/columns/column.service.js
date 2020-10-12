const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const update = id => boardsRepo.update(id);

const create = newUser => boardsRepo.create(newUser);

const deletebyId = id => boardsRepo.deletebyId(id);

module.exports = { getAll, get, update, create, deletebyId };
