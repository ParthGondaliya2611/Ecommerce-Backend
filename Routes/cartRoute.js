import express from "express";
import { addProduct, cartProducts, filterProducts } from "../Controller/cartController.js";
import { requiresign } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/AddProduct', requiresign, addProduct);
router.get('/getCart', requiresign, cartProducts);
router.put('/filtercart', requiresign, filterProducts);


export default router;
