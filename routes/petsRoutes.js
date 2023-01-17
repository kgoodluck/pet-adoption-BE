const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../_knex/knex');
const { readAllPets, getPetById } = require('../models/petsModels');
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { addPetSchema } = require('../schemas/PetSchemas');
const { checkIfUserAlreadyHasThisPet, checkIfUserHasThisPet, checkTheArray } = require('../middleware/PetsMiddleware');

const pathToPetsDB = path.resolve(__dirname, '../database/petsDB.json');

router.get('/watchlist-array/', checkTheArray, PetsController.getFullWatchlist);

router.get('/', PetsController.getAllPets);

router.get('/:petId', async (req, res) => {
    try {
        const { petId } = req.params;
        const pet = await getPetById(petId);
        res.send(pet);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}) 

router.post('/', validateBody(addPetSchema), PetsController.postNewPet);
router.put('/', validateBody(addPetSchema), PetsController.editPet);

router.get('/watchlist/:userId', PetsController.getPetsFromWatchlist);
router.post('/watchlist/:userId', checkIfUserAlreadyHasThisPet, PetsController.addPetToUserWatchlist);
router.delete('/watchlist/:userId/:petId', checkIfUserHasThisPet, PetsController.deletePetFromUserWatchlist);

router.get('/owned-pets/:userId', PetsController.getOwnedPets);

router.post('/adopt-pet/', PetsController.adoptPet);
router.post('/return-pet/', PetsController.returnPet);

module.exports = router;