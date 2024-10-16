import JWT from "jsonwebtoken";
import userModel from "../Model/userModel.js";

// Protected routes token base
export const requiresign = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
     if (user.role === "user") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }

};
