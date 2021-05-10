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
            
            db.Users.findOne({raw: true,
                where: {
                    email: info.email
                }
            }).then(user => {
                if (user) {
                    if (bcrypt.compareSync(info.password, user.password)) {
                        delete user.password;
                        req.session.user = user;
                        res.redirect('back');
                    } else {
                        req.session.loginError = 'Credentials do not match!';
                        res.redirect('back');
                    }
                } else {
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