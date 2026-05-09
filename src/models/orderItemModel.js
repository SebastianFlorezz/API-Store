const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
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
        validate: { min: 1 },
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: "order_items",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["order_id"] },
        { fields: ["product_id"] }
    ]
});

module.exports = OrderItem;
