import { hashpassword, comparepassword } from "../helper/authHelper.js";
import User from "../Model/userModel.js";

import JWT from "jsonwebtoken";

//register user
export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // existing user
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ success: true, msg: "User Already Register Please Login" });
    }
    // Register User
    const hashedpassword = await hashpassword(password);
    const user = new User({
      name,
      email,
      password: hashedpassword,
      phone,
      address,
      answer,
    });
    await user.save();
    //generate token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      msg: "User Register Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "register controller error" });
  }
};

//login user

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const match = await comparepassword(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error." });
  }
};

//update user
export const updateUserController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    // update password if provided

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Update user contoller Error" });
  }
};

// single user data
export const SingleUserData = async (req, res) => {
  try {
    // console.log(req.user.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.send({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single user data",
    });
  }
};

//forgot password
export const ForgotPassword = async (req, res) => {
  try {
    const { email, answer, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).json({ success: false, msg: "Email not found" });
    }
    const hashed = await hashpassword(password);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res
      .status(200)
      .json({ success: true, msg: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Something Went Wrong ", error });
  }
};

//test user token
export const testController = (req, res) => {
  res.json("Protected user");
};

//find the user
export const usersController = async (req, res) => {
  try {
    // Fetch users excluding those with role 0
    const users = await User.find({ role: { $ne:  1} });
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Error while getting the users", error });
  }
};

// Update a user's role
export const updateUserRole = async (req, res) => {
  const { id, role } = req.body;

  if (!id || newRole === undefined) {
    return res.status(400).json({ success: false, msg: "User ID and new role are required" });
  }

  try {
    // Update the user's role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error while updating user role", error });
  }
};