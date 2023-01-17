const { readAllPets, readAllPetsDb, addNewPet, addPetToWatchlist, deletePetFromWatchlist, getPetsFromWatchlistByUserId, getManyPetsByIds, addPetToUser, removePetFromUser, getOwnedPetsFromDB, updatePet } = require("../models/petsModels");

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
        res.status(200).send(addedPet);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editPet(req, res) {
    try {
        const editedPet = await updatePet(req.body);
        res.send("Pet edited successfully");
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getPetsFromWatchlist(req, res) {
    try {
        const { userId } = req.params;
        console.log('111111111');
        const petsFromWatchlist = await getPetsFromWatchlistByUserId(userId);
        console.log('petsFromWatchlist', petsFromWatchlist);
        res.send(petsFromWatchlist);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getFullWatchlist(req, res) {
    try {
        const arrayOfIds = req.headers.arrayofids.split(',');
        const arrayOfPets = await getManyPetsByIds(arrayOfIds);
        res.status(200).send(arrayOfPets);
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

async function getOwnedPets(req, res) {
    try {
        const { userId } = req.params;
        const arrayOfPets = await getOwnedPetsFromDB(userId);
        res.status(200).send(arrayOfPets);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function adoptPet(req, res) {
    try {
        const { userId, petId, action } = req.body;
        const addedPet = await addPetToUser(userId, petId, action);
        console.log('addedPet', addedPet);
        // const { userId } = req.params;
        // const { petId } = req.body;
        // const addedPet = await addPetToWatchlist(userId, petId);
        // console.log('added', addedPet);
        res.send('hey');
    } catch(err) {
        console.log(err);
    }
}

async function returnPet(req, res) {
    try {
        const { userId, petId, action } = req.body;
        const removerPet = await removePetFromUser(petId);
        console.log('removedPet', removerPet);
        res.send('hey');
    } catch(err) {
        console.log(err);
    }
}


module.exports = { getAllPets, postNewPet, editPet, getPetsFromWatchlist, getFullWatchlist, addPetToUserWatchlist, deletePetFromUserWatchlist, getOwnedPets, adoptPet, returnPet }