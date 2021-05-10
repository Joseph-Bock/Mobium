const {body} = require('express-validator');
const moment = require('moment');
const { parse } = require('path');
const path = require('path');

module.exports = {
    Registration: [

        body('firstname').notEmpty().withMessage('Field cannot be empty!')
                         .isLength(2).withMessage('Name is too short'),

        body('lastname').notEmpty().withMessage('Field cannot be empty!')
                        .isLength(2).withMessage('Last name is too short'),

        body('day').notEmpty().withMessage('Enter a valid birthday!')
                   .custom((day, {req}) => {
                       let info = req.body;
                       
                       if (isNaN(day) || isNaN(info.month) || isNaN(info.year)) {
                            throw new Error('Invalid Date');
                        }

                        let birthdate = new Date(info.year + '/' + info.month + '/' + day);
                        let age = moment.duration({from: birthdate, to: new Date});

                        if (age.asYears() < 13) {
                            throw new Error('You must be at least 18 years old!');
                        }
                        return true;
                    }),

        body('gender').notEmpty().withMessage('Please choose one of the options!'),

        body('image').custom((value, {req}) => {
            if (req.file) {
                const extensions = ['.png', '.jpg', '.jpeg', '.jfif'];
                const extension = path.extname(req.file.originalname);
                
                if (!extensions.includes(extension.toLowerCase())) {
                    throw new Error('File extension is not supported!');
                }
            }

            return true;
        }),

        body('email').isEmail().withMessage('Enter a valid email!'),

        body('password').custom((value, {req})=> {
            if (req.method == 'POST') {
                if (value.length <= 1) {
                    throw new Error('Enter a password!');
                }

                if (value.length < 8) {
                    throw new Error('Password is too short!');
                }

                return true;
            }

            return true
        }),

        body('confirmation').custom((value, {req}) => {
            if (req.method == 'POST') {
                if (value <= 1) {
                    throw new Error('Repeat password for confirmation!')
                } else if (value != req.body.password) {
                    throw new Error('Password confirmation does not match!')
                }

                return true;
            }

            return true;
        })
    ],

    Login: [
        body('email').custom((value, {req}) => {
            if (!value || !req.body.password) {
                throw new Error('Enter valid credentials!');
            }
            
            return true;
        })
    ],

    Product: [
        body('name').notEmpty().withMessage('Field cannot be empty!')
                    .isLength(2).withMessage('Name is too short'),

        body('manufacturer').custom((value, {req}) => {
            value = parseInt(value);

            if (value >= 1 && value <= 4) {
                return true;
            }

            throw new Error('Select a valid manufacturer!')
        }),

        body('price').custom((value, {req}) => {
            value = parseInt(value);

            if (!value) {
                throw new Error('Input a price!');
            } else if (value < 1) {
                throw new Error('Price it too low!');
            }

            return true;
        }),

        body('discount').custom((value, {req}) => {
            value = parseInt(value);

            if (value) {
                if (value > 100) {
                    throw new Error('Discount is too high!');
                }
            }

            return true;
        }),

        body('image').custom((value, {req}) => {
            if (req.file) {
                const extensions = ['.png', '.jpg', '.jpeg', '.jfif'];
                const extension = path.extname(req.file.originalname);
                
                if (!extensions.includes(extension.toLowerCase())) {
                    throw new Error('File extension is not supported!');
                }
            }

            return true;
        }),
    ]
}