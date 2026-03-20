

import jwt from "jsonwebtoken";
import UserModel from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.token ||
      (authHeader ? authHeader.split(" ")[1] : null);

   
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // find user
    const user = await UserModel.findById(decoded.id).select("-password");

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