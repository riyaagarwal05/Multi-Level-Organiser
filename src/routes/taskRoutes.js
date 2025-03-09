const express = require("express");
const router = express.Router();
const taskValidator = require("../validators/taskValidators");
const taskController = require("../controllers/taskController");

router.post("/create", taskValidator.create, taskController.create);
router.post("/update", taskValidator.update, taskController.update);
router.post("/delete", taskValidator.deleteTask, taskController.deleteTask);
router.get("/get", taskValidator.getTask, taskController.getTask);

module.exports = router;

