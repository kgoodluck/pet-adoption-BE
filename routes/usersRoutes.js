const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const { validateBody } = require('../middleware/validateBody');
const { isNewUser, checkPasswords, hashPassword, doesUserExist, verifyPassword, createToken } = require('../middleware/UsersMiddleware');
const { signUpSchema, loginSchema } = require("../schemas/UserSchemas")

router.post("/signup", validateBody(signUpSchema), isNewUser(), checkPasswords(), hashPassword(), UsersController.signUp)
router.post("/login", validateBody(loginSchema), doesUserExist, verifyPassword, createToken, UsersController.logIn)

module.exports = router; 