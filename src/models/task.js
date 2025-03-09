const { request } = require("express");
const db = require("../config/db");
const { ObjectId } = require("mongodb");

const create = async (request) => {
  const dbInstance = db.getDB();
  const result = await dbInstance.collection("task").insertOne({
    userId: request.userId,
    title: request.title,
    desc: request.desc,
  });
  return result;
};

const update = async (request) => {
  const dbInstance = db.getDB();
  const result = await dbInstance.collection("task").updateOne(
    {
      userId: request.userId,
    },
    {
      $set: {
        title: request.newTitle,
        desc: request.newDesc,
      },
    }
  );
  return result;
};

const deleteTask = async (taskId) => {
  const dbInstance = db.getDB();
  const result = await dbInstance.collection("task").deleteOne({
    _id: new ObjectId(taskId),
  });
  return result;
};

const getTask = async (userId) => {
  const dbInstance = db.getDB();
  const result = await dbInstance
    .collection("task")
    .find({
      userId,
    })
    .toArray();
    return result;
};
module.exports = { create, update, deleteTask, getTask };
