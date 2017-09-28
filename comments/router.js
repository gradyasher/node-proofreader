const express = require('express')

const controller = require('./controller')
const config = require('../config')
const router = express.Router()

router.post('/:userItem', controller.postComment)
router.delete('/:userItem/:comment', controller.deleteComment)

module.exports = { router }