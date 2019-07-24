const { Router } = require('express')
const { createNewUser } = require('../controllers/')

const router = Router()

router.post('/register', createNewUser)
module.exports = router