const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const controller = require('../controllers/loginController');


//Validations

const validateForm = [
    body('email').custom((value, {req}) => {
        if (!value || !req.body.password) {
            throw new Error('Enter valid credentials!');
        }

        return true;
    })
]

router.post('/', validateForm, controller.validateLogin);

module.exports = router;