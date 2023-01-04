const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getUserByEmail } = require('../models/usersModels')

function isNewUser() {
    return (req, res, next) => {
        const user = getUserByEmail(req.body.email)
        if (!user) return next();
        res.status(400).send("User already exists");
        return;
    }
}

function checkPasswords() {
    return (req, res, next) => {
        if (req.body.password === req.body.rePassword) {
            delete req.body.rePassword;
            next();
        } else {
            res.status(400).send("Passwords do not match");
            return;
        }
    }
}

function hashPassword() {
    return (req, res, next) => {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            if (err) {
                res.status(500).send("Error hashing password");
                return;
            }
            req.body.password = hash;
            next();
        });
        
    }
}

function doesUserExist(req, res, next) {
    const user = getUserByEmail(req.body.email)
    if (!user) {
        res.status(404).send("User wasn't found");
        return; 
    }
    req.body.user = user[0];
    next();
    return;
}

function verifyPassword(req, res, next) {
    const { password, user } = req.body;
    try {
        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                res.status(500).send("Error verifying password");
                return;
            } else if (!result) {
                res.status(400).send("Incorrect password");
                return;
            }
        next();
        });
    } catch(err) {
        console.log(err);
    }
    return;
}

function createToken(req, res, next) {
    const {user} = req.body;
    const token = jwt.sign({ email: user.email}, process.env.TOKEN_SECRET);
    req.body.token = token;
    next();
}

module.exports = { isNewUser, checkPasswords, hashPassword, doesUserExist, verifyPassword, createToken }