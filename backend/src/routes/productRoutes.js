import express from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory } from "../controllers/productController.js"
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"
import customMiddleware from "../middleware/customMiddleware.js";

const router = express.Router();
//Public routes
router.get('/', customMiddleware, getProducts)
router.get('/:id', getProductById);

router.get('/category/:category', getProductsByCategory)

//Admin routes

//Create product
router.post('/', protect, adminOnly, upload.single("image"), addProduct)

//Update product
router.put("/:id", protect, adminOnly, upload.single("image", updateProduct))

// Delete product
router.delete('/:id', protect, adminOnly, deleteProduct)

export default router;