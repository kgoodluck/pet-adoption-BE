const express = require('express');
require('dotenv').config();
const cors = require('cors');

const petsRoutes = require('./routes/petsRoutes')
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors());

app.use('/pets', petsRoutes);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});