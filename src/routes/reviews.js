const { Router } = require("express");
const { body } = require("express-validator");
const reviewController = require("../controllers/reviewController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

router.get("/", reviewController.getReviews);

router.post("/", auth, [
    body("productId").isInt().withMessage("Product ID is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    validate
], reviewController.createReview);

router.delete("/:id", auth, reviewController.removeReview);

module.exports = router;
