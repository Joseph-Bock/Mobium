const {validationResult} = require('express-validator');
const db = require('../../database/models');
const bcrypt = require('bcryptjs');

const controller = {

    //Validate Login Data

    validateLogin: (req, res) => {
        let errors = validationResult(req);
        let info = req.body;

        if (errors.isEmpty()) {
            delete req.session.loginError;
            
            db.Users.findOne({
                where: {
                    email: info.email
                }
            }).then(user => {
                if (bcrypt.compareSync(info.password, user.password)) {
                    console.log(user.name + ' ' + user.lastname + ' - Login succesful!')
                    res.redirect('back');
                } else {
                    console.log('Wrong credentials!');
                    req.session.loginError = 'Wrong credentials!';
                    res.redirect('back');
                };
            }).catch(error => {
                console.log(error);
            });

        } else {
            req.session.loginError = errors.errors[0].msg;
            res.redirect('back');
        }
    },
}

module.exports = controller;