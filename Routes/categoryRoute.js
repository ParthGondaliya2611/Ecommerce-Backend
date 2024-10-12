import express from "express";
import { isAdmin, requiresign } from "../middleware/authMiddleware.js";
import {
  createcategoryController,
  deleteCategory,
  getAllCategories,
  singleCategory,
  updateCategory,
} from "../Controller/categoryController.js";

const router = express.Router();

//create category Route
router.post("/create-category", requiresign, isAdmin, createcategoryController);

//update category
router.put("/update-category/:id", requiresign, isAdmin, updateCategory);

//delete category
router.delete("/delete-category/:id", requiresign, isAdmin, deleteCategory);

//getAll category
router.get("/categories", getAllCategories);

//single category
router.get("/single-category/:id",singleCategory);

export default router;
