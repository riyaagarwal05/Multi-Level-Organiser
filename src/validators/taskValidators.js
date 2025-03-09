const joi = require("joi");
const logger = require("../utils/loggers");

const createSchema = joi.object({
  userId: joi.string().min(1).required(),
  title: joi.string().min(5).required(),
  desc: joi.string().min(5).required(),
});

const create = (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    logger.error(`Validation Error for Create: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const updateSchema = joi.object({
  userId: joi.string().min(1).required(),
  newTitle: joi.string().min(5).required(),
  newDesc: joi.string().min(5).required(),
});

const update = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    logger.error(`validaton Error for Update: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const deleteSchema = joi.object({
  taskId: joi.string().min(1).required(),
  userId: joi.string().min(1).required(),
});

const deleteTask = (req, res, next) => {
  const { error } = deleteSchema.validate(req.body);
  if (error) {
    logger.error(
      `validation Error for deleteTask: ${error.details[0].message}`
    );
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const getTaskSchema = joi.object({
  userId: joi.string().min(1).required(),
});
const getTask = (req, res, next) => {
  logger.info(`Validating Data For Get Request: ${req.query}`);
  const { error } = getTaskSchema.validate(req.query);
  if (error) {
    logger.error(`Validation Error for getTask: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { create, update, deleteTask, getTask };

