const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
    users: [],
    column: [],
    boards: [],
    tasks: [],
};

DB.users.push(new User(), new User(), new User());
DB.boards.push(new Board(), new Board(), new Board());

const getAllUsers = async () => {
    return DB.users;
}

const getUser = async id => {
    return DB.users.find(user => user.id === id);
};

const createUser = async newUser => {
    DB.users.push(newUser);
    const user = await getUser(newUser.id);
    return user;
};

const updateUser = async ({id, updatedProperties }) => {
    const index = DB.users.findIndex(el => el.id === id);
  
    if (index > -1) {
      let element = DB.users[index];
      element = Object.assign(element, updatedProperties)
    }
    const user = await getUser(id);
    return user;
  };
  
const deleteUserById = async id => {
    const index = DB.users.findIndex(user => user.id === id);

    if (index > -1) {
        DB.users.splice(index, 1);
    }
    const user = await getUser(id);
    return user;
};

module.exports = { getUser, getAllUsers, createUser, updateUser, deleteUserById };
