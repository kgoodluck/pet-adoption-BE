const { addNewUser, getUserById } = require('../models/usersModels')

async function signUp(req, res) {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const newUser = { first_name: firstName, last_name: lastName, email, phone, hashed_password: password }
        newUserId = await addNewUser(newUser);
        res.status(200).send('User has been added');
    } catch(err) {
        console.log(err);
    }
}

function logIn(req, res) {
    try {
        const { user, token } = req.body;
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, name: user.first_name, isAdmin: user.is_admin, ok: true });
    } catch(err) {
        console.log(err);
    }
}

async function checkIfLoggedIn(req, res) {
    try {
        const { userId, token } = res.locals;
        const user = await getUserById(userId);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, name: user.first_name, isAdmin: user.is_admin, ok:true });
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