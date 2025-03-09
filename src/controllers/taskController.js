const taskServices = require("../services/taskServices");

const create = async (req, res, next) => {
  try {
    const request = {
      userId: req.body.userId,
      title: req.body.title,
      desc: req.body.desc
    };
    const response = await taskServices.create(request);
    res
      .status(201)
      .json({ task: response, message: "Task Created Successfully!!" });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    logger.error(
      `Conroller Error for create: ${error.message} Internal Server Error`
    );
  }
};


const update = async (req, res, next) => {
  try {
    const request = {
      userId: req.body.userId,
      newTitle: req.body.newTitle,
      newDesc: req.body.newDesc, 
    };
    const response = await taskServices.update(request);
    res
      .status(201)
      .json({ task: response, message: "Task Updated Successfully!!" });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    logger.error(
      `Conroller Error for Update: ${error.message} Internal Server Error`
    );
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const response = await taskServices.deleteTask(req.body.taskId);
    res
      .status(201)
      .json({ task: response, message: "Task Deleted Successfully!!" });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    logger.error(
      `Conroller Error for deleteTask: ${error.message} Internal Server Error`
    );
  }
};

const getTask = async (req, res, next) => {
  try {
    const response = await taskServices.getTask(req.query.userId);
    res
      .status(201)
      .json({ task: response, message: "Task Get Successfully!!" });
  } catch (error) {
    // console.log(error);
    logger.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    logger.error(
      `Conroller Error for getTask: ${error.message} Internal Server Error`
    );
  }
};

module.exports = { create, update, deleteTask, getTask };
