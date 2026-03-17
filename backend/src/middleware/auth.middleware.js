import express from 'express'
import UserModel from '../models/user.model.js'
import { success } from 'zod';

const authMiddleware = async(req,res,next)=>{
    try {
        // get the token from cookie or header
        const authHeader = req.header("Authorization");
        const token = req.cookies?.token || (authHeader ? authHeader.split(" ")[1] :null);

        // if no token
        if(token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized : No token provided",
            })
        }
        // verify token
        let decoded ;
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or expired token",
            })
        }

        // find user in db
        const user = await UserModel.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found"
            })
        }

        // attach user to request
        req.user = user;
        // move to next middleware/route
        next();
    } catch (error) {
        console.log("Auth middleware Error",error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}



export default authMiddleware