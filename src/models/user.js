const db = require("../config/db");

const createUser = async (request) => {
  const dbInstance = db.getDB();
  const result = await dbInstance.collection("users").insertOne({
    username: request.username,
    password: request.password,
  });
  return result;
};

const getUser = async (username) => {
  const dbInstance = db.getDB();
  const result = await dbInstance.collection("users").findOne({
    username,
  });
  return result;
};

module.exports = {
  createUser,
  getUser,
};
