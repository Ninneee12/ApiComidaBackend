const router = require('express').Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const refreshTokenController = require('../controllers/refreshTokenController');

router.post('/login', loginController.login);

router.post('/register', registerController.register);

router.get('/refreshToken', refreshTokenController.refreshToken);

module.exports = router;