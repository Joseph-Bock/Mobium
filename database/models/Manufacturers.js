module.exports = (sequelize, dataTypes) => {
    const Manufacturer = sequelize.define('Manufacturers', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    Manufacturer.associate = function (models) {
        Manufacturer.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'manufacturer'
        })
    }

    return Manufacturer;
}

