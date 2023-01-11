const fs = require("fs");
const path = require("path");
const dbConnection = require("../_knex/knex");

const pathToUsersDB = path.resolve(__dirname, "../database/usersDB.json");

function getAllUsers() {
    try {
        const allUsers = fs.readFileSync(pathToUsersDB);
        return JSON.parse(allUsers);
    } catch (err) {
        console.log(err);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await dbConnection.from('users').where('email', email).first();
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getUserById(id) {
    try {
        const user = await dbConnection.from('users').where('id', id).first();
        return user;
    } catch (err) {
        console.log(err);
    }
}

// function addNewUser(user) {
//     try {
//         const allUsers = getAllUsers();
//         allUsers.push(user);
//         const newUsersList = JSON.stringify(allUsers);
//         fs.writeFileSync(pathToUsersDB, newUsersList);
//     } catch(err) {
//         console.log(err);
//     }
// }

async function addNewUser(user) {
    try {
        const newUserId = await dbConnection.from('users').insert(user);
        return newUserId;
    } catch(err) {
        console.log(err);
    }
}

async function makeUserAnAdmin(id) {
    try {
        const newAdminId = await dbConnection.from('users').where({ id: id }).update({is_admin: true});
        return newAdminId;
    } catch(err) {
        console.log(err);
    }
}

async function updateUserData(id, data) {
    try {
        const updatedUser = await dbConnection.from('users').where('id', id).update(data);
        return updatedUser;
    } catch(err) {
        console.log(err);
    }
}


module.exports = { getAllUsers, getUserByEmail, addNewUser, getUserById, updateUserData };
