const { ErrorHandler } = require("express-error-bouncer");
const {  decode: decodeToken } = require('../helpers/jwt')
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

const isAuthenticated = (req, res, next) => {
  try {
    const { authorization: token  } = req.headers;
  
    if (!token) {
      throw new ErrorHandler(401, 'You shall not pass')
    }
    const { _uuid } = decodeToken(token);
    if (!_uuid) {
      throw new ErrorHandler(401, 'You shall not pass')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateUser,
  isAuthenticated
}