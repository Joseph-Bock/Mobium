const express = require('express');
const router = express.Router();

const dataValidator = require('../middlewares/dataValidation');
const controller = require('../controllers/registerController');


//show Register page

router.get('/', controller.index);


//send Register Form data

router.post('/', dataValidator.Registration, controller.checkData);

module.exports = router;