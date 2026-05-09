const { Sequelize, DataTypes, Model} = require('sequelize/core');
const { Attribute, PrimaryKey, AutoIncrement, NotNull, AllowNull} = require("@sequelize/core/decorators-legacy");


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: "users",
    timestamps: true,
    underscored: true,
})

module.exports = User;

