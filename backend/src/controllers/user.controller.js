import { success } from "zod";
import UserModel from "../models/user.model.js";
import express from 'express';


// get profile
export const getProfile = async (req,res)=>{
   try {
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    // user already middleware se aa chuka hai 
    const user = req.user;
    res.satus(200).json({
        success: true,
        user
    });
   } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error "
    })
   }
}

// edit profile
export const editProfile = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: "Unauthorize user"
            })
        }

        const allowedFields = [
            "firstName",
            "lastName",
            "age",
            "phoneNumber",
            "gender",
            "password"
        ]

        const updateData = {};
        // sirf wahi fields jo user ne bheji
        allowedFields.forEach((field)=>{
            if(req.body[field] !== undefined){
                updateData[field] = req.body[field];
            }
        })

        // password hash if password want to change the user
    if(updateData.password){
        const hashedPassword = await bcrypt.hash(updateData.password,10);
        updateData.password = hashedPassword;
    }

    const updatedProfile =  await UserModel.findByIdAndUpdate(
        req.user._id,
        updateData,
        {new: true}
    ).select("-password");

    res.status(200).json({
        success: false,
        message: "Updated profile successfully",
        user: updatedProfile
    })
    } catch (error) {
         console.log("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
    }
}


// delete profile

export const deleteProfile = async(req,res)=>{
    try {
        
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const deletedUser = await UserModel.findByIdAndDelete(
            req.user._id
        )
        
        if(!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

       res.clearCookie("token");

        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })
    } catch (error) {
        console.log("Error during deleting profile",error);
        res.status(500).json({
            success: false,
            message: "Internal server problem"
        })
    }
}






