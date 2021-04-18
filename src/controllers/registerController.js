const db = require('../../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const controller = {

    //Show Register page

    index: (req, res) => {
        res.render('register');
    },


    //Validation of data

    checkData: (req, res) => {
        let errors = validationResult(req);
        let info = req.body;

        db.Users.findOne({
            where: {
                email: info.email
            }
        }).then(user => {
            errors = errors.mapped({onlyFirstError: true});
            
            if (user) {
                let error = {
                    value: '',
                    msg: 'Email is already in use!',
                    param: 'email',
                    location: 'body'
                }
                errors.email = error;
            }
            res.render('register', {errors: errors});

        }).catch(error => {
            console.log(error);
        })
    },
    
    createUser: async (req, res) => {
        let info = req.body;

        db.Users.create({
            name: info.name,
            lastname: info.lastname,
            birthdate: new Date(info.year + '/' + info.month + '/' + info.day),
            gender: info.gender,
            email: info.email,
            password: await bcrypt.hash(info.password, 12),
            admin: 0

        }).then(
            res.redirect('/')
        ).catch(error => {
            console.log(error);
        });
    }
};

module.exports = controller;