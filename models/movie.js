const mongoose = require('mongoose');
const Joi = require('joi')
const {genreSchema} = require('./genre')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        // required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
}))

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().min(3).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()  
    }
}

exports.Movie = Movie; 
exports.validate = validateMovie;

// createGenre('Adventure')