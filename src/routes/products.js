const { Router } = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController");
const { auth, admin } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", auth, admin, [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isDecimal().withMessage("Valid price is required"),
    body("categoryId").isInt().withMessage("Category is required"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    validate
], productController.create);

router.put("/:id", auth, admin, productController.update);
router.delete("/:id", auth, admin, productController.remove);

module.exports = router;
