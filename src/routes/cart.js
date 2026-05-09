const { Router } = require("express");
const { body } = require("express-validator");
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get current user's cart items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 */
router.get("/", auth, cartController.getCart);

/**
 * @openapi
 * /api/cart:
 *   post:
 *     tags: [Cart]
 *     summary: Add product to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Product not found
 */
router.post("/", auth, [
    body("productId").isInt().withMessage("Product ID is required"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validate
], cartController.addItem);

/**
 * @openapi
 * /api/cart/{id}:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Set to 0 to remove item
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart item not found
 */
router.put("/:id", auth, [
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be 0 or more"),
    validate
], cartController.updateItem);

/**
 * @openapi
 * /api/cart/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item removed
 *       404:
 *         description: Cart item not found
 */
router.delete("/:id", auth, cartController.removeItem);

module.exports = router;
