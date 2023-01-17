const { getPetByPetAndUserId } = require("../models/petsModels");

async function checkIfUserAlreadyHasThisPet(req, res, next) {
    try {
        const { userId } = req.params;
        const { petId } = req.body;
        const pet = await getPetByPetAndUserId(userId, petId);
        if (pet) return res.status(403).send('Pet is already added to the watchlist');
        next();
    } catch(err) {
        console.log(err);
    }
}

async function checkIfUserHasThisPet(req, res, next) {
    try {
        const { userId, petId } = req.params;
        const pet = await getPetByPetAndUserId(userId, petId);
        if (!pet) return res.status(404).send('This pet is not found for this user');
        next();
    } catch(err) {
        console.log(err);
    }
}

function checkTheArray(req, res, next) {
    if(!req.headers.arrayofids) return res.send(false);
    if(req.headers.arrayofids == []) return res.send(false);
    next();
}

module.exports = { checkIfUserAlreadyHasThisPet, checkIfUserHasThisPet, checkTheArray }