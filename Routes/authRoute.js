import express from "express";
import {
  RegisterUser,
  LoginUser,
  testController,
  ForgotPassword,
  updateUserController,
  SingleUserData,
  usersController,
} from "../Controller/RegisterController.js";
import { isAdmin, requiresign } from "../middleware/authMiddleware.js";
const router = express.Router();

//register
router.post("/register", RegisterUser);

//login
router.post("/login", LoginUser);

//Forgot Password
router.post("/forgot-password", ForgotPassword);

//update user
router.put("/update-User/:id", requiresign, updateUserController);

//update user role
router.put("/update-User-role", requiresign, isAdmin, updateUserController);

//category Routes
router.get("/singleuser", requiresign, SingleUserData);

export default router;
