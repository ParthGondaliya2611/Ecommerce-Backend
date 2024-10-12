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

//test
router.get("/test", requiresign, isAdmin, testController);

//Forgot Password
router.post("/forgot-password", ForgotPassword);

//update user
router.put("/update-User/:id", requiresign, updateUserController);

//find all user 
router.get("/user", requiresign, isAdmin, usersController);

//update user role
router.put("/update-User-role",requiresign, isAdmin, updateUserController);


//protected user routes auth
router.get("/user-auth", requiresign, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin Routes
router.get("/admin-auth", requiresign, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//category Routes
router.get("/singleuser",requiresign, SingleUserData);

export default router;
