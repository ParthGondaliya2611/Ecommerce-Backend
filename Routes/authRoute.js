import express from "express";
import {
  RegisterUser,
  LoginUser,
  ForgotPassword,
  updateUserController,
  SingleUserData,
  resetpassword,
} from "../Controller/RegisterController.js";
import { isAdmin, requiresign } from "../middleware/authMiddleware.js";
const router = express.Router();

//register
router.post("/register", RegisterUser);

//login
router.post("/login", LoginUser);

//Forgot Password link
router.post("/forgot-password", ForgotPassword);

//resetpassword
router.post("/resetpassword/:token", resetpassword);

//update user
router.put("/update-User/:id", requiresign, updateUserController);



//category Routes
router.get("/singleuser", requiresign, SingleUserData);

export default router;
