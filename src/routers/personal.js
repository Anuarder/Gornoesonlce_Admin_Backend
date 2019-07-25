const router = require('express').Router();
const personalController = require('../controllers/personal');
const checkAuth = require('../config/checkAuth');

router.get('/getPersonal', checkAuth, personalController.getPersonal);
router.post('/addNewPersonal', checkAuth, personalController.addNewPersonal);
router.post('/deletePersonal', checkAuth, personalController.deletePersonal);

module.exports = router;