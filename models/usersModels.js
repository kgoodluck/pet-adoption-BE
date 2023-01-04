const fs = require("fs");
const path = require("path");

const pathToUsersDB = path.resolve(__dirname, "../database/usersDB.json");

function getAllUsers() {
    try {
        const allUsers = fs.readFileSync(pathToUsersDB);
        return JSON.parse(allUsers);
    } catch (err) {
        console.log(err);
    }
}

function getUserByEmail(email) {
    try {
        const allUsers = getAllUsers();
        const user = allUsers.filter(user => user.email === email)
        return user.length > 0? user : false;
    } catch (err) {
        console.log(err);
    }
}

function getUserById(id) {
    try {
        const allUsers = getAllUsers();
        const user = allUsers.filter(user => user.id === id)
        return user.length > 0? user : false;
    } catch (err) {
        console.log(err);
    }
}

function addNewUser(user) {
    try {
        const allUsers = getAllUsers();
        allUsers.push(user);
        const newUsersList = JSON.stringify(allUsers);
        fs.writeFileSync(pathToUsersDB, newUsersList);
    } catch(err) {
        console.log(err);
    }
}

module.exports = { getAllUsers, getUserByEmail, addNewUser, getUserById };
