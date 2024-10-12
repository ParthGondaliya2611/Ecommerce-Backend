import {
  createProduct,
  deleteProduct,
  filterProducts,
  searchProducts,
  searchSimilarProducts,
  singleProduct,
  updateProduct,
} from "../Controller/ProductController.js";
import express from "express";
import multer from "multer";
import { isAdmin, requiresign } from "../middleware/authMiddleware.js";
export const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

//upload product imag

//single Product
router.get("/singleProducts/:id", singleProduct);

//create a new Product
router.post(
  "/create-product",
  requiresign,
  isAdmin,
  upload.array("thumbnail"),
  createProduct
);

//update a Product
router.put("/update-product/:id", requiresign, isAdmin, upload.array("thumbnail"), updateProduct);

//delete a Product
router.delete("/delete-product/:id", requiresign, isAdmin, deleteProduct);

//get filtered Products
router.get("/products", filterProducts);

//get search products
router.get("/search-item/:keyword", searchProducts);

//get similar products
router.get("/similar-products/:pid/:cid", searchSimilarProducts);

export default router;
