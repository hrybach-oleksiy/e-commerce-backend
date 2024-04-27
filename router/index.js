const { Router } = require('express');

const router = new Router();
const UserController = require('../controllers/user-controller');

// User Authentication
router.post('/registration', UserController.registration);

module.exports = router;
