const { Category } = require("../models");

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll({ where: { isActive: true } });
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        await category.update(req.body);
        res.json(category);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        await category.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
