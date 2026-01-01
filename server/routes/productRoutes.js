import express from "express";
import { body, validationResult } from "express-validator";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const validateCreateProduct = [
  body("title").notEmpty().withMessage("Title is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("brand").optional().isString().withMessage("Brand must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.route("/").get(getProducts).post(protect, adminOnly, validateCreateProduct, createProduct);
router.route("/:id").get(getProductById);

export default router;
