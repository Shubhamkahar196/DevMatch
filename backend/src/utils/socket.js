import http from 'http'
import { Server } from "socket.io";
import chatModel from '../models/chat.model.js';
import socketAuth from '../middleware/socketAuth.middleware.js';
const initializeSocket = (server)=>{
    const io = new Server(server,{
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    });
    
//   socket middleware
io.use(socketAuth);

    io.on("connection",(socket)=>{
        // handle event
        console.log("Connected",socket.user.firstName);

        // socket.on("joinChat",({firstName,userId,targetUserId})=>{
        //   const roomId = [userId,targetUserId].sort().join("_");

        //   console.log("joinroom " + roomId)
        //   socket.join(roomId);
        // })

        socket.on("joinChat",({targetUserId})=>{
            const userId = socket.user._id
          const roomId = [userId,targetUserId].sort().join("_");

          console.log("joinroom " + roomId)
          socket.join(roomId);
        })

        socket.on("sendMessage",async({ targetUserId,text})=>{
            
            // save message to the db
            try {
                const userId = socket.user._id;
                const firstName = socket.user.firstName;
                
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
                io.to(roomId).emit("messageReceived", {
      firstName,
      senderId: userId,
      text,
      timestamp: new Date(),
    });
                console.log("message recievied",firstName + text);
            } catch (error) {
                console.log(error);
            }
//  io.to(roomId).emit("messageReceived", {firstName,text})
        })

        socket.on("disconnect",()=>{

        })
    })

}



export default initializeSocket

