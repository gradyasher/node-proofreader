const express = require('express')

const controller = require('./controller')
const config = require('../config')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/', jsonParser, controller.createEdit)

router.post('/all', jsonParser, controller.getAllEdits)

router.get('/:uid', jsonParser, controller.getUserEdits)

router.delete('/:uid/:id', jsonParser, controller.deleteEdit)

module.exports = { router }