const { Router } = require("express");
const { body } = require("express-validator");
const categoryController = require("../controllers/categoryController");
const { auth, admin } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);

router.post("/", auth, admin, [
    body("name").notEmpty().withMessage("Name is required"),
    validate
], categoryController.create);

router.put("/:id", auth, admin, categoryController.update);
router.delete("/:id", auth, admin, categoryController.remove);

module.exports = router;
