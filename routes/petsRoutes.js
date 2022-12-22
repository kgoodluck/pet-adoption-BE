const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
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

module.exports = router;