const { Router } = require("express");
const { body } = require("express-validator");
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

router.get("/", auth, cartController.getCart);

router.post("/", auth, [
    body("productId").isInt().withMessage("Product ID is required"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validate
], cartController.addItem);

router.put("/:id", auth, [
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be 0 or more"),
    validate
], cartController.updateItem);

router.delete("/:id", auth, cartController.removeItem);

module.exports = router;
