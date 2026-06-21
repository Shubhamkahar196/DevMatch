import express from 'express';
import chatModel from '../models/chat.model.js';

export const chatController = async(req,res)=>{
    const {targetUserId} = req.params;
    const userId = req.user._id;

    try {
        let chat = await chatModel.findOne({
            participants: {$all:[userId,targetUserId]},
        }).populate({
            path: "messages.senderId",
            select: "firstName"
        })

        if(!chat){
            chat = new chatModel({
                participants: [userId,targetUserId],
                messages:[],
            })
            await chat.save();
        }
        res.status(200).json({chat})
    } catch (error) {
        console.log(error);
    }
}

