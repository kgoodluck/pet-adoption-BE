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

const updateInfoSchema = {
    type: "object",
    properties: {
        "firstName": {type: "string"},
        "lastName": {type: "string"},
        "email": {type: "string", format:"email"},
        "phone": {type: "string"},
        "bio": {type: "string"},
        "password": {type: "string"},
        "newPassword": {type: "string"},
        "isChangingPassword": {type: "boolean"},
    },
    required: ["firstName", "lastName", "email", "phone", "bio"]  
}

module.exports = { signUpSchema, loginSchema, updateInfoSchema }