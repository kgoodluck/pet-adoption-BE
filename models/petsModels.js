const fs = require("fs");
const path = require("path");

const pathToPetsDB = path.resolve(__dirname, "../database/petsDB.json");

const dbConnection = require("../_knex/knex")

function readAllPets() {
    try {
        const petsArray = fs.readFileSync(pathToPetsDB);
        return JSON.parse(petsArray);
    } catch (err) {
        console.log(err);
    }
}

async function readAllPetsDb() {
    try {
        const petsArray = await dbConnection.from('pets');
        return petsArray;
    } catch (err) {
        console.log(err);
    }
}

async function getPetById(id) {
    try {
        const pet = await dbConnection.from('pets').where('id', id).first();
        return pet;
    } catch (err) {
        console.log(err);
    }
}

async function addNewPet(pet) {
    try {
        const addedPetId = await dbConnection.from('pets').insert(pet);
        return addedPetId;
    } catch (err) {
        console.log(err);
    }
}

async function populateDb() {
    try {
        const petsArray = fs.readFileSync(pathToPetsDB);
        const parcedArray = JSON.parse(petsArray);
        
        for (const pet of parcedArray) {
            pet['dietary'] = '[]';
            pet['hypoallergenic'] = pet['hypoallergnic'];
            delete pet['dietery'];
            delete pet['hypoallergnic'];
            delete pet['id'];

            await dbConnection.from('pets').insert(pet);
        }
    } catch (err) {
        console.log(err);
    }
}

// populateDb();

async function addPetToWatchlist(userId, petId) {
    try {
        const addedPet = await dbConnection.from('pets_to_users_watchlish').insert({ user_id: userId, pet_id: petId });
        return addedPet;
    } catch(err) {
        console.log(err);
    }
}

async function deletePetFromWatchlist(userId, petId) {
    try {
        const addedPet = await dbConnection.from('pets_to_users_watchlish').where({ user_id: userId, pet_id: petId }).del();
        return addedPet;
    } catch(err) {
        console.log(err);
    }
}

async function getPetByPetAndUserId(userId, petId) {
    try {
        console.log('userId', userId);
        console.log('petId', petId);
        const pet = await dbConnection.from('pets_to_users_watchlish').where({ user_id: userId, pet_id: petId }).first();
        console.log('pet', pet);
        return pet;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { readAllPets, readAllPetsDb, getPetById, addNewPet, addPetToWatchlist, deletePetFromWatchlist, getPetByPetAndUserId };
