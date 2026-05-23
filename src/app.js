const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { sequelize } = require("./models");
const errorHandler = require("./middleware/errorHandler");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const reviewRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT;

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    message: { error: "Too many requests, please try again later" }
});
app.use(globalLimiter);

const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { error: "Too many authentication attempts, please try again later" }
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Store API Docs",
}));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api/docs`);
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
});
