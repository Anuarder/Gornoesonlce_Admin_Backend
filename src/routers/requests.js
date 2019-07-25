const router = require('express').Router();
const checkAuth = require('../config/checkAuth');
const requestsController = require('../controllers/requests');

router.post('/sendRequest', requestsController.sendRequest);
router.post('/deleteRequest', checkAuth, requestsController.deleteRequests);
router.get('/getRequests',  requestsController.getRequests);
router.get('/getLastRequests', requestsController.getLastRequests);
router.put('/updateRequest', checkAuth, requestsController.updateRequest);

module.exports = router;