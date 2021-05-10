module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },

        firstname: {
            type: dataTypes.STRING,
            allowNull: false
        },

        lastname: {
            type: dataTypes.STRING,
            allowNull: false
        },

        birthdate: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },

        image: {
            type: dataTypes.STRING,
            allowNull: true
        },

        email: {
            type: dataTypes.STRING,
            allowNull: false
        },

        gender: {
            type: dataTypes.STRING(6),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING,
            allowNull: false
        },

        admin: {
            type: dataTypes.TINYINT,
            allowNull: false
        }
    })

    return User;

}