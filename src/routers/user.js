const router = require('express').Router();
const usersController = require('../controllers/user');

router.post('/login', usersController.login);

module.exports = router;