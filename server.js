const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./_knex/knex');
require('dotenv').config();

const petsRoutes = require('./routes/petsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser())

app.use('/pets', petsRoutes);
app.use('/users', usersRoutes);

dbConnection
.migrate
.latest()
.then((migration) => {
    if (migration) {
        console.log('Connected to database', migration);
        app.listen(PORT, () => {
            console.log(`App is listening at ${PORT}`);
        });
    }
})
.catch((err) => {
    console.log('Error connecting to database', err);
});