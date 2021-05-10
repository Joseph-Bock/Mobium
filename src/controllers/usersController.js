const fs = require('fs');
const Users = require('../../database/models').Users;
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const controller = {
    get: (req, res) => {
        let id = req.params.id;

        Users.findByPk(id, {raw: true})
        .then(user => {
            if (user) {
                delete user.password;
                delete user.admin;
                delete user.createdAt;
                delete user.updatedAt;

                return res.status(200).json({user, status: 200});
            }

            return res.status(204).json({status : 204});
        })
    },

    create: (req, res) => {
        const errors = validationResult(req);
        const info = req.body;

        req.file ? info.image = req.file.filename : info.image = undefined;

        Users.findOne({
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
                Users.create({
                    firstname: info.firstname,
                    lastname: info.lastname,
                    birthdate: new Date(info.year + '/' + info.month + '/' + info.day),
                    gender: info.gender,
                    image: info.image,
                    email: info.email,
                    password: bcrypt.hashSync(info.password, 12),
                    admin: 0
                    
                }).then(newUser => {
                    res.status(201).json({id : newUser.id, status : 201})
                }).catch(error => {
                    console.log(error);
                });
            } else {
                if (req.file) {
                    fs.unlink(req.file.path, (error) => {
                        error ? console.log(error) : undefined;
                        return;
                    })
                }

                res.status(200).json({errors : errors.mapped({onlyFirstError: true}), status : 200});
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({status : 500});
        })
    },

    update: (req, res) => {
        const errors = validationResult(req);
        const info = req.body;
        const id = info.id;

        Users.findOne({
            where: {
                email: info.email
            }
        }).then(user => {
            if (user) {
                if (user.id != id) {
                    let error = {
                        value: '',
                        msg: 'Email is already in use!',
                        param: 'email',
                        location: 'body'
                    }
                    
                    errors.errors.push(error);
                }
            }

            if (errors.isEmpty()) {
                if (req.file) {
                    info.image = req.file.filename
        
                    Users.findByPk(id, {raw : true})
                    .then(user => {
                        fs.unlink('../public/img/profileImages/' + user.image, (error) => {
                            error ? console.log(error) : undefined;
                            return;
                        })
                    }).catch(error => {
                        console.log(error);
                        return res.status(500).json({status : 500});
                    })
                } else {
                    info.image = undefined;
                }

                Users.update({
                    firstname: info.firstname,
                    lastname: info.lastname,
                    birthdate: new Date(info.year + '/' + info.month + '/' + info.day),
                    gender: info.gender,
                    image: info.image,
                    email: info.email,
                    password: info.password ? bcrypt.hashSync(info.password, 12) : undefined,
        
                }, {
                    where: {
                        id: id
                    }
                }).then(data => {
                    return res.status(200).json({id: info.id, status : 200})
                }).catch(error => {
                    console.log(error);
                    return res.status(500).json({status : 500});
                })
            } else {
                if (req.file) {
                    fs.unlink(req.file.path, (error) => {
                        error ? console.log(error) : undefined;
                        return;
                    })
                }

                res.status(200).json({errors : errors.mapped({onlyFirstError: true}), status : 200});
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({status : 500});
        })
    },

    delete: (req, res) => {
        const id = req.params.id

        Users.destroy({
            where: {
                id: id
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({status : 500});
        })

        return res.status(404).json({status : 404})
    }
}

module.exports = controller;