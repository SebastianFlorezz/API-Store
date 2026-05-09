const { Router } = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/orderController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

/**
 * @openapi
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create an order from cart items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [shippingAddress, city, postalCode, phone]
 *             properties:
 *               shippingAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cart is empty or insufficient stock
 */
router.post("/", auth, [
    body("shippingAddress").notEmpty().withMessage("Shipping address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("postalCode").notEmpty().withMessage("Postal code is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    validate
], orderController.createOrder);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get current user's orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by user ID (admin only)
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", auth, orderController.getOrders);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get("/:id", auth, orderController.getOrder);

module.exports = router;
