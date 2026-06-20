import http from 'http'
import { Server } from "socket.io";


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

        socket.on("sendMessage",({ firstName,userId,targetUserId,text})=>{
            const roomId =[userId,targetUserId].sort().join("_");
            console.log("firstName" + text)
io.to(roomId).emit("messageReceived", {firstName,text})
        })

        socket.on("disconnect",()=>{

        })
    })

}



export default initializeSocket

