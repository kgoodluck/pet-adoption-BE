const Ajv = require("ajv")
const ajv = new Ajv();
const format = require('ajv-formats');
format(ajv);

function validateBody(schema) {
    return (req, res, next) => {
        const validate = ajv.validate(schema, req.body);
        if (validate) return next();
        console.log("problem with body: " + req.body);
        res.status(400).send("problem with body:" + JSON.stringify(ajv.errors));
    }
}

module.exports = { validateBody }