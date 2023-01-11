const { addNewUser, getUserById, updateUserData } = require('../models/usersModels')

async function signUp(req, res) {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const newUser = { first_name: firstName, last_name: lastName, email, phone, hashed_password: password }
        const newUserId = await addNewUser(newUser);
        res.status(200).send('User has been added');
    } catch(err) {
        console.log(err);
    }
}

function logIn(req, res) {
    try {
        const { user, token } = req.body;
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, firstName: user.first_name, lastName: user.last_name, isAdmin: user.is_admin, ok: true });
    } catch(err) {
        console.log(err);
    }
}

async function checkIfLoggedIn(req, res) {
    try {
        const { userId, token } = res.locals;
        const user = await getUserById(userId);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, firstName: user.first_name, lastName: user.last_name, isAdmin: user.is_admin, ok:true });
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

async function getUserData(req, res) {
    try {
        const { userId, token } = res.locals;
        const user = await getUserById(userId);
        user.bio === null ? user.bio = "" : "";
        res.cookie('token', token, { maxAge: 900000, httpOnly: true});
        res.status(200).send({ id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, phone: user.phone, bio: user.bio, joinedAt: user.registered_at });
    } catch(err) {
        console.log(err);
    }
}

async function updateUserInfo(req, res) {
    try {
        const { id, firstName, lastName, email, phone, bio, newPassword, isChangingPassword } = req.body;
        const newUserData = { first_name: firstName, last_name: lastName, email, phone, bio };
        if (isChangingPassword) { newUserData.hashed_password = newPassword };
        const updatedUserID = await updateUserData(id, newUserData);
        res.status(200).send('User data has been updated');
    } catch(err) {
        console.log(err);
    }
}


module.exports = { signUp, logIn, checkIfLoggedIn, logOut, getUserData, updateUserInfo }