import express from "express";
import {  requiresign } from "../middleware/authMiddleware.js";
import { deleteaddressController, getaddressController, newaddressController } from "../Controller/AddressController.js";

const router = express.Router();





//create address
router.post("/newaddress",requiresign,newaddressController);
router.get("/getaddress",requiresign,getaddressController);
router.delete("/deleteaddress/:id",requiresign,deleteaddressController);

export default router;