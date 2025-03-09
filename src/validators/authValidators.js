const Joi = require("joi");
const logger = require("../utils/loggers");

const signUpSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
});

const signUp = (req, res, next) => {
  logger.info(`Auth Validator Request for SignUp: ${req.body}`);
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    logger.error(
      `Auth Validator Error for SignUp: ${error.details[0].message}`
    );
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const loginSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
});

const login = (req, res, next) => {
  logger.info(`Auth Validator Request For Login: ${req.body}`);
  const { error } = loginSchema.validate(req.body);
  if (error) {
    logger.error(`Auth Validator Error for Login: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { signUp, login };
