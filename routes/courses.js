const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Joi = require('joi');


// const courses = [
//     { id: 1, name: 'course1'},
//     { id: 2, name: 'course2'},
//     { id: 3, name: 'course3'}
// ]

const Books = mongoose.model('Books', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}))

router.get('/', async (req, res) => {
    const books = await Books.find().sort('name')
    res.send(books)
})

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message)
        return;
    }

    let book = new Book({
        name: req.body.name
    });
    book = await book.save()
    res.send(book)
})

router.put('/:id', async (req, res) => {
    
    //Validate
    // if not valid, return 400 - Bad request
    const result = validateCourse(req.body);
    const { error } = result;
    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message)
        return;
    }

    //Look up a course
    const book = await Books.findByIdAndUpdate(req.params.id, { 
        new: true
    })

    if (!course) return res.status(404).send('The book with the given ID was not found')
 

    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);
})

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
})

// app.get('/:id', (req, res) => {
//     const course =  courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) res.status(404).send('The course with the given ID was not found')
//     res.send(course)
// })

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;

