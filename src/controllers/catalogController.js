const Products = require('../../database/models').Products;

const controller = {
    index: (req, res) => {
        const search = req.query.search;

        Products.findByPk(search, {raw : true})
        .then(product => {
            if (product) {
                delete product.createdAt;
                delete product.updatedAt;

                res.render('catalog', {product});
            } else {
                res.render('catalog');
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

module.exports = controller;