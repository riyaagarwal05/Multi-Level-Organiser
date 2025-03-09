const taskModel = require("../models/task");
const redis = require("../config/redis");
const logger = require("../utils/loggers");
const { log } = require("winston");

// const create = async (request) => {
//   const result = await taskModel.create(request);
//   return result;
// };

const create = async (request) => {
  const client = redis.getClient();
  const result = await taskModel.create(request);

  const cacheKey = `tasks:${request.userId}`;
  await client.del(cacheKey);
  return result;
};

// const update = async (request) => {
//   const result = await taskModel.update(request);
//   return result;
// };
const update = async (request) => {
  const client = redis.getClient();
  const result = await taskModel.update(request);

  const cacheKey = `tasks:${request.userId}`;
  await client.del(cacheKey);

  return result;
};

// const deleteTask = async (taskId) => {
//   const result = await taskModel.deleteTask(taskId);
//   return result;
// };

const deleteTask = async (request) => {
  const client = redis.getClient();
  const result = await taskModel.deleteTask(request.taskId);
  logger.info(`Result of Delete Task for UserId: ${request.userId} are ${result}`);

  const cacheKey = `task:${request.userId}`;
  await client.del(cacheKey);
  logger.info(`Deleted Data From cache for UserId: ${request.userId}`);
  return result;
};

// const getTask = async (userId) => {
//   const result = await taskModel.getTask(userId);
//   return result;
// };

const getTask = async (userId) => {
  const client = redis.getClient();
  const cacheKey = `tasks:${userId}`;
  logger.info(`cacheKey for Redis Data ${cacheKey}`);
  const cachedData = await client.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const result = await taskModel.getTask(userId);
  await client.set(cacheKey, JSON.stringify(result), { EX: 3600 });

  return result;
};

module.exports = { create, update, deleteTask, getTask };
