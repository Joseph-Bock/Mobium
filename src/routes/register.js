const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const controller = require('../controllers/registerController');


//Validations

const validateForm = [
    body('name').notEmpty().withMessage('Field cannot be empty!'),

    body('lastname').notEmpty().withMessage('Field cannot be empty!'),

    body('day').notEmpty().withMessage('Field cannot be empty!')
                .isInt().withMessage('Only numbers are allowed'),

    body('month').notEmpty().withMessage('Field cannot be empty!')
                .isInt().withMessage('Only numbers are allowed'),

    body('year').notEmpty().withMessage('Field cannot be empty!')
                .isInt().withMessage('Only numbers are allowed'),

    body('gender').notEmpty().withMessage('Please choose one of the options'),

    body('email').isEmail().withMessage('Enter a valid email!'),

    body('password').notEmpty().withMessage('Enter a password!'),

    body('confirmation').notEmpty().withMessage('Repeat your password for confirmation!')
                        .custom((value, {req}) => {
                            if (value != req.body.password) {
                                throw new Error('Password confirmation does not match')
                            }

                            return true;

                        })

];


//show Register page

router.get('/', controller.index);


//send Register Form data

router.post('/', validateForm, controller.createUser);

module.exports = router;