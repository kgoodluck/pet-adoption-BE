const { addNewUser } = require('../models/usersModels')

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
        res.status(200).send({ name: user.firstName, token: token });
    } catch(err) {
        console.log(err);
    }
}

module.exports = { signUp, logIn }