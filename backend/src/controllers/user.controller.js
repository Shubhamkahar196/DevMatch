import { success } from "zod";
import UserModel from "../models/user.model.js";
import express from 'express';



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