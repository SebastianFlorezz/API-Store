const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Store API",
            version: "1.0.0",
            description: "E-commerce REST API built with Express and Sequelize",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                        details: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    field: { type: "string" },
                                    message: { type: "string" },
                                },
                            },
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        role: { type: "string", enum: ["customer", "admin"] },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        user: { $ref: "#/components/schemas/User" },
                        token: { type: "string" },
                    },
                },
                Category: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        slug: { type: "string" },
                        description: { type: "string" },
                        imageUrl: { type: "string" },
                        isActive: { type: "boolean" },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        slug: { type: "string" },
                        description: { type: "string" },
                        price: { type: "number", format: "decimal" },
                        comparePrice: { type: "number", format: "decimal" },
                        stock: { type: "integer" },
                        imageUrl: { type: "string" },
                        isActive: { type: "boolean" },
                        categoryId: { type: "integer" },
                    },
                },
                Review: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        productId: { type: "integer" },
                        userId: { type: "integer" },
                        rating: { type: "integer", minimum: 1, maximum: 5 },
                        comment: { type: "string" },
                        User: { $ref: "#/components/schemas/User" },
                    },
                },
                CartItem: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        userId: { type: "integer" },
                        productId: { type: "integer" },
                        quantity: { type: "integer" },
                        Product: { $ref: "#/components/schemas/Product" },
                    },
                },
                Order: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        userId: { type: "integer" },
                        status: {
                            type: "string",
                            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
                        },
                        total: { type: "number", format: "decimal" },
                        shippingAddress: { type: "string" },
                        city: { type: "string" },
                        postalCode: { type: "string" },
                        phone: { type: "string" },
                        OrderItems: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" },
                        },
                    },
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        orderId: { type: "integer" },
                        productId: { type: "integer" },
                        quantity: { type: "integer" },
                        unitPrice: { type: "number", format: "decimal" },
                        Product: { $ref: "#/components/schemas/Product" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
