const { Op } = require("@sequelize/core");
const { Product, Category } = require("../models");

exports.getAll = async (req, res, next) => {
    try {
        const { categoryId, search, minPrice, maxPrice } = req.query;
        const where = { isActive: true };

        if (categoryId) where.categoryId = categoryId;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = minPrice;
            if (maxPrice) where.price[Op.lte] = maxPrice;
        }
        if (search) where.name = { [Op.like]: `%${search}%` };

        const products = await Product.findAll({
            where,
            include: [{ model: Category, attributes: ["name", "slug"] }]
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ["name", "slug"] }]
        });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        await product.update(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        await product.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
