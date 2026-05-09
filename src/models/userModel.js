const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

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
    },
    role: {
        type: DataTypes.ENUM("customer", "admin"),
        defaultValue: "customer",
        allowNull: false,
    }
}, {
    tableName: "users",
    timestamps: true,
    underscored: true,
});

module.exports = User;
