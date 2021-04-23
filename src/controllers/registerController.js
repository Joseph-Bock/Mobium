const db = require('../../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const inputs = {
    name: {},
	lastname: {},
	day: {},
    gender: {},
    email: {},
    password: {},
    confirmation: {}
}

const controller = {

    //Show Register page

    index: (req, res) => {
        res.render('register');
    },


    //Validation of data

    checkData: (req, res) => {
        let errors = validationResult(req);
        const info = req.body;

        db.Users.findOne({
            where: {
                email: info.email
            }
        }).then(user => {      
            if (user) {
                let error = {
                    value: '',
                    msg: 'Email is already in use!',
                    param: 'email',
                    location: 'body'
                }
                errors.errors.push(error);
            }
            
            if (errors.isEmpty()) {
                controller.createUser(req, res);
            } else {
                errors = errors.mapped({onlyFirstError: true});
                res.render('register', {data: {errors: errors, inputs: inputs, info: info}});
            }
        }).catch(error => {
            console.log(error);
        })
    },


    //Create user and save it to database

    createUser: (req, res) => {
        let info = req.body;

        db.Users.create({
            name: info.name,
            lastname: info.lastname,
            birthdate: new Date(info.year + '/' + info.month + '/' + info.day),
            gender: info.gender,
            email: info.email,
            password: bcrypt.hashSync(info.password, 12),
            admin: 0
            
        }).then(
            res.redirect('/')
        ).catch(error => {
            console.log(error);
        });
    }
};

module.exports = controller;