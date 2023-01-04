const knex = require('knex');
const knexConfig = require('./knexfile.js');
const dbConnection = knex(knexConfig);

module.exports = dbConnection;