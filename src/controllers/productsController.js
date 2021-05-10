const fs = require('fs');
const Products = require('../../database/models').Products;
const {validationResult} = require('express-validator');


function randomNumber (limit) {
    return Math.floor(Math.random() * limit);
}

const properties = {
    storage: () => {
        const values = [8, 18, 32, 64, 128, 256];
        return values[randomNumber(values.length)];
    },

    ram: () => {
        const values = [4, 6, 8, 12]
        return values[randomNumber(values.length)];
    },

    processor: () => {
        const values = ['A14 Bionic', 'Snapdragon 888', 'Exynos 2100', 'Kirin 9000', 'Snapdragon 870'];
        return values[randomNumber(values.length)];
    },
    color: () => {
        const values = ['Black', 'White', 'Red', 'Green', 'Blue', 'Other'];
        return values[randomNumber(values.length)];
    },

    weight: () => {
        const values = [140, 150, 160, 170];
        return values[randomNumber(values.length)];
    },

    display: () => {
        const values = [4, 4.4, 4.5, 5, 5.5, 6, 6.1, 6.7];
        return values[randomNumber(values.length)];
    },

    resolution: () => {
        const values = ['750 x 1334', '1080 x 1920', '1242 x 2688', '1125 x 2436', '640 x 1136'];
        return values[randomNumber(values.length)];
    },

    frontCamera: () => {
        const values = [12, 13, 14, 15, 16, 17, 18, 19, 20];
        return values[randomNumber(values.length)];
    },

    backCamera: () => {
        const values = [5, 6, 7, 8, 9, 10, 11, 12];
        return values[randomNumber(values.length)];
    },

    video: () => {
        const values = ['1080p@60FPS', '1080p@120FPS', '2K@60FPS', '2K@120FPS', '4K@60FPS'];
        return values[randomNumber(values.length)];
    }
}


const controller = {
    list: (req, res) => {
        Products.findAll({
            include: [{association: 'manufacturers'}]
        }).then(products => {
            return res.status(200).json({products, status : 200});
        }).catch(error => {
            console.log(error);
        })
    },

    get: (req, res) => {
        const id = req.params.id;

        Products.findByPk(id, {raw: true})
        .then(product => {
            if (product) {
                return res.status(200).json({product, status: 200});
            }

            return res.status(204).json({status : 204});
        })
    },

    create: (req, res) => {
        const info = req.body;
        const errors = validationResult(req);

        req.file ? info.image = req.file.filename : info.image = undefined;

        Products.findOne({
            where: {
                name: info.name
            }
        }).then(product => {
            if (product) {
                let error = {
                    value: '',
                    msg: 'Product already exists!',
                    param: 'name',
                    location: 'body'
                }
                
                errors.errors.push(error);
            }

            if (errors.isEmpty()) {
                Products.create({
                    name: info.name,
                    manufacturer: info.manufacturer,
                    price: info.price,
                    discount: info.discount,
                    image: info.image,
                    storage: properties.storage(),
                    ram: properties.ram(),
                    processor: properties.processor(),
                    color: properties.color(),
                    weight: properties.weight(),
                    display: properties.display(),
                    resolution: properties.resolution(),
                    frontCamera: properties.frontCamera(),
                    backCamera: properties.backCamera(),
                    video: properties.video()
    
                }).then(newProduct => {
                    return res.status(201).json({id : newProduct.id, status : 201})
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

                return res.status(200).json({errors : errors.mapped({onlyFirstError: true}), status : 200});
            }
        })
    },

    update: (req, res) => {
        const info = req.body;
        const id = info.id;
        const errors = validationResult(req);

        Products.findOne({
            where: {
                name: info.name
            }
        }).then(product => {
            if (product.id != id) {
                let error = {
                    value: '',
                    msg: 'Product already exists!',
                    param: 'name',
                    location: 'body'
                }
                
                errors.errors.push(error);
            }

            if (errors.isEmpty()) {
                if (req.file) {
                    info.image = req.file.filename
        
                    Products.findByPk(id, {raw : true})
                    .then(product => {
                        fs.unlink('../public/img/productImages/' + product.image, (error) => {
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

                Products.update({
                    name: info.name,
                    manufacturer: info.manufacturer,
                    price: info.price,
                    discount: info.discount,
                    image: info.image,
                    storage: properties.storage(),
                    ram: properties.ram(),
                    processor: properties.processor(),
                    color: properties.color(),
                    weight: properties.weight(),
                    display: properties.display(),
                    resolution: properties.resolution(),
                    frontCamera: properties.frontCamera(),
                    backCamera: properties.backCamera(),
                    video: properties.video()
                }, {
                    where: {
                        id: id
                    }
                }).then(data => {
                    return res.status(201).json({id : info.id, status : 201})
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

        Products.destroy({
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