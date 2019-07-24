const { Router } = require('express')
const { createNewUser, loginUser } = require('../controllers/')
const { validateUser } = require('../middleware')

const router = Router()

router.post('/register', validateUser, createNewUser)
router.post('/login', validateUser, loginUser)

module.exports = router