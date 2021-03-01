const express = require('express');
const userController = require('../controllers/users');
const router = express.Router()
const validator = require('../validators')


//signup
router.post('/signup',validator.createUserValidator,userController.createUser)
//signin
router.post('/signin',validator.verifyUserValidator,userController.verifyUser)

module.exports = router;