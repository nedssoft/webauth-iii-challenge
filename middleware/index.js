const { ErrorHandler } = require("express-error-bouncer");
const {  decode: decodeToken } = require('../helpers/jwt')
const User = require('../data/models/users')

const validateUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ErrorHandler(400, "Username or Password cannot be empty");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token  } = req.headers;
  
    if (!token) {
      throw new ErrorHandler(401, 'You shall not pass')
    }
    const { _uuid } = decodeToken(token);
    if (!_uuid) {
      throw new ErrorHandler(401, 'You shall not pass')
    }
    const user = await User.find({id: _uuid});
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateUser,
  isAuthenticated
}