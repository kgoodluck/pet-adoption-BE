const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const { validateBody } = require('../middleware/validateBody');
const { isNewUser, checkPasswords, hashPassword, doesUserExist, verifyPassword, createToken, verifyToken, hashNewPassword } = require('../middleware/UsersMiddleware');
const { signUpSchema, loginSchema, updateInfoSchema } = require("../schemas/UserSchemas")

router.post("/signup", validateBody(signUpSchema), isNewUser(), checkPasswords(), hashPassword(), UsersController.signUp)
router.post("/login", validateBody(loginSchema), doesUserExist, verifyPassword, createToken, UsersController.logIn)
router.post("/logout", verifyToken, UsersController.logOut)

router.put("/", verifyToken, validateBody(updateInfoSchema), doesUserExist, verifyPassword, hashNewPassword, UsersController.updateUserInfo);

router.get("/login", verifyToken, UsersController.checkIfLoggedIn);
router.get("/getUserData/:id", verifyToken, UsersController.getUserData);

module.exports = router; 