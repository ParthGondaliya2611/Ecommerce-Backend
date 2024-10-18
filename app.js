import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import connectDB from "./db.js";
import product from "./Routes/ProductRoute.js";
import authRoute from "./Routes/authRoute.js";
import categoryRoute from "./Routes/categoryRoute.js";
import cartRoute from "./Routes/cartRoute.js";
import AddressRoute from "./Routes/AddressRoute.js";
import OrderRoute from "./Routes/OrderRoute.js";
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // If you're dealing with cookies or sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Customize allowed headers if needed
  })
);
app.options("*", cors()); // Allow preflight requests for all routes
app.use(cors());

app.use("/api/v1", product);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/Address", AddressRoute);
app.use("/api/v1/Order", OrderRoute);

export default app;
