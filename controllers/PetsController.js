const { readAllPets, readAllPetsDb, addNewPet, addPetToWatchlist, deletePetFromWatchlist } = require("../models/petsModels");

async function getAllPets(req, res) {
    try {
        const petsArray = await readAllPetsDb();
        res.send(petsArray);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function postNewPet(req, res) {
    try {
        const addedPet = await addNewPet(req.body);
        console.log('added', addedPet);
        res.send('hey');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addPetToUserWatchlist(req, res) {
    try {
        const { userId } = req.params;
        const { petId } = req.body;
        const addedPet = await addPetToWatchlist(userId, petId);
        console.log('added', addedPet);
        res.send('hey');
    } catch(err) {
        console.log(err);
    }
}

async function deletePetFromUserWatchlist(req, res) {
    try {
        const { userId, petId } = req.params;
        const deletedPet = await deletePetFromWatchlist(userId, petId);
        console.log('deleted', deletedPet);
        res.send('del');
    } catch(err) {
        console.log(err);
    }
}



module.exports = { getAllPets, postNewPet, addPetToUserWatchlist, deletePetFromUserWatchlist }