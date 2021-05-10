module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Products', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        },

        manufacturer: {
            type: dataTypes.STRING,
            allowNull: false
        },

        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        discount: {
            type: dataTypes.INTEGER
        },

        image: {
            type: dataTypes.INTEGER
        },

        storage: {
            type: dataTypes.INTEGER
        },

        ram: {
            type: dataTypes.INTEGER
        },

        processor: {
            type: dataTypes.STRING
        },

        color: {
            type: dataTypes.STRING
        },

        weight: {
            type: dataTypes.INTEGER
        },

        display: {
            type: dataTypes.INTEGER
        },

        resolution: {
            type: dataTypes.STRING
        },

        frontCamera: {
            type: dataTypes.INTEGER
        },

        backCamera: {
            type: dataTypes.INTEGER
        },

        video: {
            type: dataTypes.STRING
        }
    })

    Product.associate = function (models) {
        Product.belongsTo(models.Manufacturers, {
            as: 'manufacturers',
            foreignKey: 'manufacturer'
        })
    }

    return Product;
    
}