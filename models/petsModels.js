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

async function getManyPetsByIds(arrayOfIds) {
    try {
        const petsArray = await dbConnection.from('pets').whereIn('id', arrayOfIds);
        return petsArray;
    } catch(err) {
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

async function updatePet(pet) {
    try {
        delete pet.created_at;
        const updatedPet = await dbConnection.from('pets').where({id: pet.id}).update(pet);
        return updatedPet;
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

async function getOwnedPetsFromDB(userId) {
    try {
        const allPets = await dbConnection.from('pets').where({ ownerId: userId });
        return allPets;
    } catch(err) {
        console.log(err);
    }
}

async function getPetsFromWatchlistByUserId(userId) {
    try {
        console.log('userId', userId);
        const allPets = await dbConnection.from('pets_to_users_watchlish').where({ user_id: userId }).select('pet_id');
        return allPets;
    } catch(err) {
        console.log(err);
    }
}

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

async function addPetToUser(userId, petId, action) {
    try {
        const status = action === 'adopt' ? 'Adopted' : 'Fostered';
        const pet = await dbConnection.from('pets').where({id: petId}).update({ ownerId: userId, adoptionStatus: status })
        return pet;
    } catch(err) {
        console.log(err);
    }
}

async function changeId() {
    try {
        const change = await dbConnection.from('pets').where({ownerId: null, adoptionStatus: 'Fostered'}).update({ ownerId: 77 });
    } catch(err) {
        console.log(err);
    }
}

// changeId();

async function removePetFromUser(petId) {
    try {
        console.log('petId', petId);
        const pet = await dbConnection.from('pets').where({id: petId}).update({ ownerId: null, adoptionStatus: 'Available' });
        console.log('removing pet');
        return pet;
    } catch(err) {
        console.log(err);
    }
}

// removePetFromUser('129')

module.exports = { readAllPets, readAllPetsDb, getPetById, getManyPetsByIds, addNewPet, updatePet, getOwnedPetsFromDB, getPetsFromWatchlistByUserId, addPetToWatchlist, deletePetFromWatchlist, getPetByPetAndUserId, addPetToUser, removePetFromUser };
