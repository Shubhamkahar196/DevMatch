import http from 'http'
import { Server } from "socket.io";
import chatModel from '../models/chat.model.js';

const initializeSocket = (server)=>{
    const io = new Server(server,{
        cors: {
            origin: 'http://localhost:5173',
        },
    });
    

    io.on("connection",(socket)=>{
        // handle event


        socket.on("joinChat",({firstName,userId,targetUserId})=>{
          const roomId = [userId,targetUserId].sort().join("_");

          console.log("joinroom " + roomId)
          socket.join(roomId);
        })

        socket.on("sendMessage",async({ firstName,userId,targetUserId,text})=>{
            
            // save message to the db
            try {
                const roomId =[userId,targetUserId].sort().join("_");
                let chat = await chatModel.findOne({
                    participants: {$all: [userId,targetUserId]}
                });

                if(!chat){
                    chat = new chatModel({
                        participants: [userId,targetUserId],
                        messages:[],
                    })
                }

                chat.messages.push({
                    senderId: userId,
                    text,
                })

                await chat.save();
                io.to(roomId).emit("messageReceived", {firstName,text})
            } catch (error) {
                console.log(error);
            }

        })

        socket.on("disconnect",()=>{

        })
    })

}



export default initializeSocket

