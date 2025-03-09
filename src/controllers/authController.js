const authServices = require("../services/authServices");
const logger = require("../utils/loggers");

const signUp = async (req, res, next) => {
  try {
    const request = {
      username: req.body.username,
      password: req.body.password,
    };
    const response = await authServices.signUp(request);
    logger.info(`Response of SignUp: ${(request, response)}`);
    res
      .status(201)
      .json({ user: response, message: "User created Successfully!!" });
  } catch (error) {
    logger.error(`Error in Auth SignUp: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const request = {
      username: req.body.username,
      password: req.body.password,
    };
    const response = await authServices.login(request);
    logger.info(`Response of Login: ${(request, response)}`);
    res
      .status(201)
      .json({ user: response, message: "LoggedIn Successfully!!" });
  } catch (error) {
    logger.error(`Error in Auth Login: ${error}`);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  login,
};
