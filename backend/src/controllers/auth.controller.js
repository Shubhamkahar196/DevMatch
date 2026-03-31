import UserModel from "../models/user.model.js";
import z from "zod";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const signupSchema = z.object({
  firstName: z.string().min(3, "Character should be at least 3 letter"),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password not more than 12 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone format")
    .optional()
    .or(z.literal("")),
  age: z.string().optional(),
  gender: z.enum(["Male", "Female", "other"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password not more than 12 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

// signup
export const Signup = async (req, res) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
    }

    const { firstName, lastName, email, password, phoneNumber, age, gender } =
      parsedData.data;

    //  const user = await UserModel.findOne({email});
    //  if(user){
    //     return res.status(400).json({
    //         message: "User already registered with this email "
    //     })
    //  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      age,
      gender,
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "User signup successfully!",
      newUser: userResponse,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }
    console.log("Error during signup", error);
    res.status(500).json({
      message: "Internal server problem",
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    const { email, password } = parsedData.data;

    const existingUser = await UserModel.findOne({ email })
      .select("+password")
      .lean();

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found ",
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordMatched) {
      return res.status(403).json({
        message: "Password incorrect",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Login successfully",
      token,
      user: existingUser,
    });
  } catch (error) {
    console.log("Error during login", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// logout

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Logout error", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forgetPassword
// first enter email -> Verify -> email than -> new Password
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
