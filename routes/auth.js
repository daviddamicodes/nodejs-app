const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi')
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const { find } = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or Password');

    const token = user.generateAuthToken();
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))

    // res.send(true)
    res.send(token)
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(req, schema);
}

module.exports = router;