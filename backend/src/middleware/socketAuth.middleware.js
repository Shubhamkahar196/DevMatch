import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const socketAuth = async (socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;
// console.log("Cookies =>", cookies);
    if (!cookies) {
      return next(new Error("Authentication Failed"));
    }

    const token = cookies
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];
      console.log("Token =>", token);

    if (!token) {
      return next(new Error("Token not found"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    // console.log("Decoded =>", decoded);

    const userId = decoded._id || decoded.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.log(error);
    console.log("SOCKET AUTH ERROR =>", error);
    next(new Error("Authentication Failed"));
  }
};

export default socketAuth;