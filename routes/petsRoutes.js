const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../_knex/knex');
const { readAllPets, getPetById } = require('../models/petsModels');
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { addPetSchema } = require('../schemas/PetSchemas');
const { checkIfUserAlreadyHasThisPet, checkIfUserHasThisPet } = require('../middleware/PetsMiddleware');

const pathToPetsDB = path.resolve(__dirname, '../database/petsDB.json');

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

router.get('/watchlist/:userId', PetsController.getAllPets);
router.post('/watchlist/:userId', checkIfUserAlreadyHasThisPet, PetsController.addPetToUserWatchlist);
router.delete('/watchlist/:userId/:petId', checkIfUserHasThisPet, PetsController.deletePetFromUserWatchlist);

module.exports = router;