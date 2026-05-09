const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    tableName: "orders",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["status"] }
    ]
});

module.exports = Order;
