const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const router = express.Router()

const controller = require('./controller')

const jsonParser = bodyParser.json()

const { User } = require('./models')

router.post('/', jsonParser, controller.createUser)

router.get('/', (req, res) => {
    return User.find()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => res.status(500).json({message: 'Internal server error'}))
})

router.get('/:userId', controller.getUserInfo)

module.exports = {router}
