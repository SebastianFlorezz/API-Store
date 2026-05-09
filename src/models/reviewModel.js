const { DataTypes } = require("@sequelize/core");
const { sequelize } = require("../db");

const Review = sequelize.define("Review", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 1, max: 5 },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: "reviews",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["product_id"] },
        { fields: ["user_id"] },
        { unique: true, fields: ["product_id", "user_id"] }
    ]
});

module.exports = Review;
