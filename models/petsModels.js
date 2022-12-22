const fs = require("fs");
const path = require("path");

const pathToPetsDB = path.resolve(__dirname, "../database/petsDB.json");

function readAllPets() {
    try {
        const petsArray = fs.readFileSync(pathToPetsDB);
        return JSON.parse(petsArray);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { readAllPets };
