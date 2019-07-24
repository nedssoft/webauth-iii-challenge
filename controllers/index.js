const User = require('../data/models/users');
const { ErrorHandler } = require("express-error-bouncer");
const bcrypt = require("bcrypt");
const { encode: getToken } = require('../helpers/jwt')

const createNewUser = async (req, res, next ) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    if (hashedPassword) {
      const userData = {...req.body, password: hashedPassword };
      const user = await User.createUser(userData);
      if (!user) {
        throw new ErrorHandler(500, "Could not save new user");
      }
      return res.status(201).json({
        "message:": "registration successful",
        user
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.find({ username });
    const isMatched = user && (await bcrypt.compareSync(password, user.password));
    if (!isMatched) {
      throw new ErrorHandler(401, "You shall not pass!");
    }
    const token = getToken({ _uuid: user.id});
    const { password: pass, ...rest } = user;
    return res.status(200).json({
      user: {...rest, token },
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createNewUser,
  loginUser,
  getAllUsers
};
