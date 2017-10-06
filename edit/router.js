const express = require('express')

const controller = require('./controller')
const config = require('../config')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/', jsonParser, controller.createEdit)

router.get('/:uid', jsonParser, controller.getEdits)

router.delete('/:uid/:id', jsonParser, controller.deleteEdit)

module.exports = { router }