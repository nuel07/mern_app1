const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorhandler');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})