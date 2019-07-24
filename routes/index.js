const { Router } = require('express')
const { createNewUser, loginUser, getAllUsers } = require('../controllers/')
const { validateUser, isAuthenticated } = require('../middleware')

const router = Router()

router.post('/register', validateUser, createNewUser)
router.post('/login', validateUser, loginUser)
router.get('/users', isAuthenticated, getAllUsers)

module.exports = router