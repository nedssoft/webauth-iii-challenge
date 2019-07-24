const User = require('../data/models/users');
const { ErrorHandler } = require("express-error-bouncer");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res, next) => {
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

module.exports = {
  createNewUser,
};
