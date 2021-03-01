const express = require('express');
const postController = require('../controllers/users');
const router = express.Router()
const validator = require('../validators')

router.get('/',postController.getPosts)
router.post('/signup',validator.createPostValidator,postController.createPost)
router.post('/signin',validator.verifyPostValidator,postController.verifyPost)

module.exports = router;