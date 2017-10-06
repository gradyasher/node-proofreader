const express = require('express')

const config = require('../config')
const bodyParser = require('body-parser')
const controller = require('./controller')
const textRouter = express.Router()

const jsonParser = bodyParser.json()

textRouter.get('/:uid', jsonParser, controller.getText)

textRouter.delete('/:uid/:id', jsonParser, controller.deleteText)

textRouter.post('/', jsonParser, controller.saveTextToApi)

textRouter.get('/edits/:id', jsonParser, controller.getEdits)

module.exports = { textRouter }