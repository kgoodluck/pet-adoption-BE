const { readAllPets, readAllPetsDb, addNewPet } = require("../models/petsModels");

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



module.exports = { getAllPets, postNewPet }