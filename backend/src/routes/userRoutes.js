const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')
const {tokenVerification} = require('D:/blogging-app/backend/middleware.js')

router.use(['/profile', '/me'], tokenVerification);

router.get('/', UserController.getAllUsers);
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser)
router.get('/profile', UserController.profileUser)
router.get('/me', UserController.meUser)

module.exports = router