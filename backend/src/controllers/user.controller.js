import { success } from "zod";
import UserModel from "../models/user.model.js";
import express from 'express';
import bcrypt from "bcryptjs";
import ConnectionModel from "../models/connectionRequest.model.js";


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
    res.status(200).json({
        success: true,
        user
    });
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
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
            
        ]

        const updateData = {};
        // sirf wahi fields jo user ne bheji
        allowedFields.forEach((field)=>{
            if(req.body[field] !== undefined){
                updateData[field] = req.body[field];
            }
        })

      

    const updatedProfile =  await UserModel.findByIdAndUpdate(
        req.user._id,
        updateData,
        {returnDocument: "after"}
    ).select("-password");

    res.status(200).json({
        success:true,
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

// feed

export const getFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //  find all connections
    const connections = await ConnectionModel.find({
      $or: [
        { sender: loggedInUser._id },
        { receiver: loggedInUser._id }
      ]
    }).select("sender receiver");

    //  build hide list
    const hideUsers = new Set();

    connections.forEach((conn) => {
      hideUsers.add(conn.sender.toString());
      hideUsers.add(conn.receiver.toString());
    });

    // also hide self
    hideUsers.add(loggedInUser._id.toString());

    //  get feed users
    const users = await UserModel.find({
      _id: { $nin: Array.from(hideUsers) }
    })
      .select("firstName lastName age gender")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (err) {
    console.log("Feed error:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};