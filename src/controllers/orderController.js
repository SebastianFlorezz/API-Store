const { Op } = require("@sequelize/core");
const { Order, OrderItem, CartItem, Product } = require("../models");

exports.createOrder = async (req, res, next) => {
    try {
        const { shippingAddress, city, postalCode, phone } = req.body;

        const cartItems = await CartItem.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product }]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        let total = 0;
        const orderItemsData = [];

        for (const item of cartItems) {
            if (item.quantity > item.Product.stock) {
                return res.status(400).json({
                    error: `Insufficient stock for "${item.Product.name}"`
                });
            }

            const unitPrice = parseFloat(item.Product.price);
            total += unitPrice * item.quantity;

            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice
            });
        }

        const order = await Order.create({
            userId: req.user.id,
            total: total.toFixed(2),
            shippingAddress,
            city,
            postalCode,
            phone
        });

        for (const data of orderItemsData) {
            await OrderItem.create({ ...data, orderId: order.id });
            await Product.decrement("stock", {
                by: data.quantity,
                where: { id: data.productId }
            });
        }

        await CartItem.destroy({ where: { userId: req.user.id } });

        const fullOrder = await Order.findByPk(order.id, {
            include: [{ model: OrderItem, include: [{ model: Product, attributes: ["name", "price"] }] }]
        });

        res.status(201).json(fullOrder);
    } catch (error) {
        next(error);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const where = { userId: req.user.id };

        if (req.user.role === "admin" && req.query.userId) {
            where.userId = req.query.userId;
        }

        const orders = await Order.findAll({
            where,
            include: [{ model: OrderItem, include: [{ model: Product, attributes: ["name", "imageUrl"] }] }],
            order: [["createdAt", "DESC"]]
        });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const where = { id: req.params.id };

        if (req.user.role !== "admin") {
            where.userId = req.user.id;
        }

        const order = await Order.findOne({
            where,
            include: [{ model: OrderItem, include: [{ model: Product, attributes: ["name", "imageUrl", "price"] }] }]
        });

        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (error) {
        next(error);
    }
};
