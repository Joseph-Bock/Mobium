const express = require('express');
const router = express.Router();

const dataValidator = require('../middlewares/dataValidation');
const controller = require('../controllers/loginController');


router.post('/', dataValidator.Login, controller.validateLogin);

module.exports = router;