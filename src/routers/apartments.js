const router = require('express').Router();
const apartmentsController = require('../controllers/apartments');
const checkAuth = require('../config/checkAuth');

router.get('/getApartments', apartmentsController.getApartments);
router.post('/getApartmentByNumber', apartmentsController.getApartmentByNumber);
router.put('/soldApartment', checkAuth, apartmentsController.soldApartment);

module.exports = router;