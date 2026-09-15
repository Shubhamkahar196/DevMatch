import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.token || (authHeader ? authHeader.split(" ")[1] : null);
      
      console.log("PATH:", req.originalUrl);
console.log("COOKIES:", req.cookies);
console.log("AUTH HEADER:", authHeader);
console.log("TOKEN:", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // verify token
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded._id;

    // find user
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // attach user
    req.user = user;

    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
