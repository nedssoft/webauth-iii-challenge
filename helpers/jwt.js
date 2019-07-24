const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('express-error-bouncer')
const { jwtSecret } = require('../config/secret')

const encode = (payload) => {
  try {
    return jwt.sign(payload, jwtSecret, {expiresIn: '3h'});
  } catch (error) {
    throw new ErrorHandler(error.message)
  }
}

const decode = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new ErrorHandler(500, error.message)
  }
}

module.exports = {
  encode,
  decode
}