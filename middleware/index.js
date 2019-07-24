const { ErrorHandler } = require("express-error-bouncer");

const validateUser = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ErrorHandler("400", "Email or Password cannot be empty");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUser
}