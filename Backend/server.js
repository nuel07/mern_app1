const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorhandler');
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})