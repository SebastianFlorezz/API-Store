const { Router } = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/orderController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

router.post("/", auth, [
    body("shippingAddress").notEmpty().withMessage("Shipping address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("postalCode").notEmpty().withMessage("Postal code is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    validate
], orderController.createOrder);

router.get("/", auth, orderController.getOrders);
router.get("/:id", auth, orderController.getOrder);

module.exports = router;
