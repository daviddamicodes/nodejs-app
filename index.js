const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const customers = require('./routes/customers');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const genres = require('./routes/genres');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());

app.use(logger);

app.use('/api/courses', courses);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/genres', genres);
app.use('/api/auth', auth);


const port  = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))