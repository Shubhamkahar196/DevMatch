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

export const getFeed = async(req,res)=>{
    try {
        const loggedId = req.user._id;

        const connections = await ConnectionModel.find({
            $or:[
                {senderId: loggedId},
                {receiverId: loggedId}
            ]
        })

         // extract user ids to hide
    // const hideUsers = new Set();
    const hideUsers = new Set();

    connections.forEach((conn)=>{
        hideUsers.add(conn.sender.toString());
        hideUsers.add(conn.receiver.toString());
    })

  hideUsers.add(loggedId.toString());

   

    //  find users NOT in hide list
    const users = await UserModel.find({
        _id: { $nin: Array.from(hideUsers)}
    }).select("firstName lastName age gender");
   

    res.status(200).json({
      success: true,
      data: users
    });
    } catch (error) {
        console.log("Error while getting feed",error);
        res.status(500).json({
                message: error.message
            })
    }
}



