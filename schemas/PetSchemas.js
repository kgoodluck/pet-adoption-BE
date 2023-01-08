const addPetSchema = {
    type: "object",
    properties: {
        "type": {type: "string"},
        "name": {type: "string"},
        "adoptionStatus": {type: "string"},
        "picture": {type: "string"},
        "height": {type: "number"},
        "weight": {type: "number"},
        "color": {type: "string"},
        "bio": {type: "string"},
        "hypoallergenic": {type: "boolean"},
        "dietary": {type: "string"},
        "breed": {type: "string"},
        "age": {type: "number"},
        "ownerId": {type: "string"}
    },
    required: ["type", "name", "adoptionStatus", "picture"]  
}

module.exports = { addPetSchema }