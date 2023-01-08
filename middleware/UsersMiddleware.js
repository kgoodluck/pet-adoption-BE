const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getUserByEmail } = require('../models/usersModels')

function isNewUser() {
    return async (req, res, next) => {
        const user = await getUserByEmail(req.body.email)
        if (!user) return next();
        console.log('user ->>>>>', user);
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

async function doesUserExist(req, res, next) {
    const user = await getUserByEmail(req.body.email)
    if (!user) {
        res.status(404).send("User wasn't found");
        return; 
    }
    req.body.user = user;
    next();
    return;
}

function verifyPassword(req, res, next) {
    const { password, user } = req.body;
    console.log('user', user);
    try {
        bcrypt.compare(password, user.hashed_password, function(err, result) {
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
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    req.body.token = token;
    next();
}

function verifyToken(req, res, next) {
    const { token } = req.cookies;
    console.log('token', token);
    if (!token) {
        res.status(401).send("Token Required");
        return;
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send("Invalid Token");
            return;
        }
        console.log('decoded', decoded);
        if (decoded) {
            res.locals.token = token;
            res.locals.userId = decoded.id;
            next();
            return
        }
        next();
    });
}

module.exports = { isNewUser, checkPasswords, hashPassword, doesUserExist, verifyPassword, createToken, verifyToken }