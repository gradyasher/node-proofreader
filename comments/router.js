const express = require('express')

const controller = require('./controller')
const config = require('../config')
const router = express.Router()

router.post('/:item', controller.postComment)
router.post('/:item/:comment', controller.deleteComment)
router.put('/:item/:comment', controller.editComment)

module.exports = { router }