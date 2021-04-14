const db = require('../../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const controller = {

    //Show Register page

    index: (req, res) => {
        res.render('register');
    },


    //Validation and Creation of new users
    
    createUser: (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        
        if (errors.isEmpty()) {
            let info = req.body;

            db.Users.create({
                name: info.name,
                lastname: info.lastname,
                birthdate: new Date(info.year + '-' + info.month + '-' + info.day),
                gender: info.gender,
                email: info.email,
                password: bcrypt.hashSync(info.password, 12),
                admin: 0
            }).then(
                res.redirect('/')
            ).catch(error => {
                console.log(error);
            }) 

        } else {
            res.render('register', {errors: errors.mapped({onlyFirstError: true})});
        };
    }
}

module.exports = controller;