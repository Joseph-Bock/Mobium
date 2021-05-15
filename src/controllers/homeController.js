const Products = require('../../database/models').Products;
const Operators = require('sequelize')

const controller = {
    index: (req, res) => {
        Products.findAll({raw : false,
            include: [{association: 'manufacturers'}],
            order: Operators.literal('rand()'),
            limit: 6
        }).then(products => {
            if (products) {
                res.render('home', {products});
            } else {
                res.render('home');
            }
        }).catch(error => {
            console.log(error);
        })
    },
}

module.exports = controller;