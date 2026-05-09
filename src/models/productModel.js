const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name cannot be empty" },
            len: { args: [3, 150], msg: "Name must be between 3 and 150 characters" }
        }
    },
    slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9-]+$/
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: { args: [0], msg: "Price cannot be negative" }
        }
    },
    comparePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            isDecimal: true,
            min: { args: [0], msg: "Compare price cannot be negative" }
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 }
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: { isUrl: true }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "products",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["category_id"] },
        { fields: ["is_active"] },
        { fields: ["price"] }
    ]
});

Product.beforeValidate((product) => {
    if (product.name && !product.slug) {
        product.slug = product.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
});

module.exports = Product;
