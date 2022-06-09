const router = require('express').Router();
const storeController = require('../controllers/storeController');

router.get('/', storeController.findAll);

module.exports = router;