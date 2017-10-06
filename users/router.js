const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();

const controller = require('./controller')

const jsonParser = bodyParser.json();

router.post('/', jsonParser, controller.createUser)

// Never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
    return User.find()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};
