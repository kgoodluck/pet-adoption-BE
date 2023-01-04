const { addNewUser, getUserById } = require('../models/usersModels')

function signUp(req, res) {
    try {
        const { firstName, lastName, phone, password, email } = req.body;
        const newUser = { firstName, lastName, phone, password, email }
        addNewUser(newUser);
        res.status(200).send('User has been added');
    } catch(err) {
        console.log(err);
    }
}

function logIn(req, res) {
    try {
        const { user, token } = req.body;
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        console.log(res);
        res.status(200).send({ id: user.id, name: user.firstName, ok:true });
    } catch(err) {
        console.log(err);
    }
}

function checkIfLoggedIn(req, res) {
    try {
        const { userId, token } = res.locals;
        const user = getUserById(userId)[0];
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, name: user.firstName, ok:true });
    } catch(err) {
        console.log(err);
    }
}

function logOut(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).send('Logged out successfully');
    } catch(err) {
        console.log(err);
    }
}


module.exports = { signUp, logIn, checkIfLoggedIn, logOut }