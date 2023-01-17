const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../_knex/knex');
const { readAllPets, getPetById } = require('../models/petsModels');
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../middleware/validateBody');
const { addPetSchema } = require('../schemas/PetSchemas');
const { checkIfUserAlreadyHasThisPet, checkIfUserHasThisPet, checkTheArray } = require('../middleware/PetsMiddleware');
const { upload, addUrl } = require('../middleware/ImagesMiddleware');

const pathToPetsDB = path.resolve(__dirname, '../database/petsDB.json');

router.get('/watchlist-array/', checkTheArray, PetsController.getFullWatchlist);

router.get('/', PetsController.getAllPets);

router.get('/:petId', PetsController.getOnePetById);

// validateBody(addPetSchema)
// (req, res) => {console.log('req.body', req.body)},

router.post('/', upload.single('picture'), addUrl, PetsController.postNewPet);
router.put('/', validateBody(addPetSchema), PetsController.editPet);

router.get('/watchlist/:userId', PetsController.getPetsFromWatchlist);
router.post('/watchlist/:userId', checkIfUserAlreadyHasThisPet, PetsController.addPetToUserWatchlist);
router.delete('/watchlist/:userId/:petId', checkIfUserHasThisPet, PetsController.deletePetFromUserWatchlist);

router.get('/owned-pets/:userId', PetsController.getOwnedPets);

router.post('/adopt-pet/', PetsController.adoptPet);
router.post('/return-pet/', PetsController.returnPet);

module.exports = router;