const express = require('express');
const router = express.Router();
const path = require('path');
const { readAllPets } = require('../models/petsModels');

const pathToPetsDB = path.resolve(__dirname, '../database/petsDB.json');

router.get('/', (req, res) => {
    try {
        const petsArray = readAllPets();
        res.send(petsArray);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.get('/:petId', (req, res) => {
    try {
        const { petId } = req.params;
        console.log('req', req);
        const petsArray = readAllPets();
        const pet = petsArray.find(item => item.id === petId)
        res.send(pet);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;