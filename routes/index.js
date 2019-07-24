const { Router } = require('express')
const { createNewUser } = require('../controllers/')
const { validateUser } = require('../middleware')

const router = Router()

router.post('/register', validateUser, createNewUser)
module.exports = router