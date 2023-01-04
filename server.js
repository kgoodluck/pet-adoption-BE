const express = require('express');
const cors = require('cors');
require('dotenv').config();

const petsRoutes = require('./routes/petsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors());

app.use('/pets', petsRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});