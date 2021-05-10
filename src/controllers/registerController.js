const fs = require('fs');
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
        const info = req.body;

        req.file ? info.image = req.file.filename : info.image = undefined;

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

                if (req.file) {
                    fs.unlink(req.file.path, (error) => {
                        error ? console.log(error) : undefined;
                        return;
                    })
                }

                errors = errors.mapped({onlyFirstError: true});
                res.render('register', {errors: errors});
            }
        }).catch(error => {
            console.log(error);
        })
    },


    //Create user and save it to database

    createUser: (req, res) => {
        let info = req.body;

        db.Users.create({
            firstname: info.firstname,
            lastname: info.lastname,
            birthdate: new Date(info.year + '/' + info.month + '/' + info.day),
            gender: info.gender,
            image: info.image,
            email: info.email,
            password: bcrypt.hashSync(info.password, 12),
            admin: 0
            
        }).then(newUser => {
            console.log(newUser.id);
            res.redirect('/');
        }).catch(error => {
            console.log(error);
        });
    }
};

module.exports = controller;