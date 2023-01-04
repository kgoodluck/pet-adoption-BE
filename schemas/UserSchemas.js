const signUpSchema = {
    type: "object",
    properties: {
        "firstName": {type: "string"},
        "lastName": {type: "string"},
        "email": {type: "string", format:"email"},
        "phone": {type: "string"},
        "password": {type: "string"},
        "rePassword": {type: "string"},
    },
    required: ["firstName", "email", "password", "rePassword"]  
}

const loginSchema = {
    type: "object",
    properties: {
        "email": {type: "string", format:"email"},
        "password": {type: "string"},
    },
    required: ["email", "password"]  
}

module.exports = { signUpSchema, loginSchema }