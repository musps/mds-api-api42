const express = require('express')
const router = express.Router()
const controller = require('./index.controller')

router.get('/ping', controller.ping)
router.get('/list', controller.list)

module.exports = router
