// external imports
const express = require("express");
const { check } = require("express-validator")

// internal imports
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator, addUserValidationHandler } = require("../middlewares/users/usersValidator");

const router = express.Router();

// login page
router.get("/users", decorateHtmlResponse("Users"), getUsers);

// add users
router.post("/",
    avatarUpload,
    addUserValidator,
    addUserValidationHandler,
    addUser
);

module.exports = router;