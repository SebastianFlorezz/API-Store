const { Sequelize } = require("@sequelize/core");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "mysql",
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 3306
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection with database has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    sequelize,
    testConnection
}
