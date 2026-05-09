const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

const CartItem = sequelize.define("CartItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 1 },
    }
}, {
    tableName: "cart_items",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["product_id"] },
        { unique: true, fields: ["user_id", "product_id"] }
    ]
});

module.exports = CartItem;
