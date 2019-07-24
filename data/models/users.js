const db = require('../../config/db');
const { ErrorHandler } = require("express-error-bouncer");

const createUser = async userData => {
  try {
    const user = await db("users").insert(userData);
    if (user) {
      return find({id: user[0]});
    }
    throw new ErrorHandler(500, "Internal server error");
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const find = async userData => {
  try {
    const [key] = Object.keys(userData);
    const [value] = Object.values(userData);
    const user = await db("users").where({ [key] : value}).select('id', 'username', 'department').first();
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

const getUsers = (dept) => {
  try {
    return db('users').where('department', dept).select('id', 'username', 'department');
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
}

module.exports = {
  createUser,
  find,
  getUsers
};
