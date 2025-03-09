const express = require("express");
const authController = require("../controllers/authController");
const authValidator = require("../validators/authValidators");

const router = express.Router();

router.post("/signUp", authValidator.signUp, authController.signUp);
router.post("/login", authValidator.login, authController.login);

module.exports = router;