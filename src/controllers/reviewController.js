const { Review, Product, User } = require("../models");

exports.getReviews = async (req, res, next) => {
    try {
        const where = {};
        if (req.query.productId) where.productId = req.query.productId;
        if (req.query.userId) where.userId = req.query.userId;

        const reviews = await Review.findAll({
            where,
            include: [
                { model: User, attributes: ["id", "name"] },
                { model: Product, attributes: ["id", "name"] }
            ],
            order: [["createdAt", "DESC"]]
        });
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

exports.createReview = async (req, res, next) => {
    try {
        const { productId, rating, comment } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const existing = await Review.findOne({
            where: { userId: req.user.id, productId }
        });
        if (existing) {
            return res.status(409).json({ error: "You already reviewed this product" });
        }

        const review = await Review.create({
            productId,
            userId: req.user.id,
            rating,
            comment
        });

        await review.reload({
            include: [{ model: User, attributes: ["id", "name"] }]
        });

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

exports.removeReview = async (req, res, next) => {
    try {
        const where = { id: req.params.id };

        if (req.user.role !== "admin") {
            where.userId = req.user.id;
        }

        const review = await Review.findOne({ where });
        if (!review) return res.status(404).json({ error: "Review not found" });

        await review.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
