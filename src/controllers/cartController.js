const { CartItem, Product } = require("../models");

exports.getCart = async (req, res, next) => {
    try {
        const items = await CartItem.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl", "stock"] }]
        });
        res.json(items);
    } catch (error) {
        next(error);
    }
};

exports.addItem = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const [item, created] = await CartItem.findOrCreate({
            where: { userId: req.user.id, productId },
            defaults: { quantity }
        });

        if (!created) {
            item.quantity += quantity;
            await item.save();
        }

        await item.reload({ include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl"] }] });
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const item = await CartItem.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!item) return res.status(404).json({ error: "Cart item not found" });

        if (quantity < 1) {
            await item.destroy();
            return res.status(204).end();
        }

        item.quantity = quantity;
        await item.save();

        await item.reload({ include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl"] }] });
        res.json(item);
    } catch (error) {
        next(error);
    }
};

exports.removeItem = async (req, res, next) => {
    try {
        const item = await CartItem.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });
        if (!item) return res.status(404).json({ error: "Cart item not found" });

        await item.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
