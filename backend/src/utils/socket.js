import http from "http";
import { Server } from "socket.io";
import chatModel from "../models/chat.model.js";
import socketAuth from "../middleware/socketAuth.middleware.js";
import ConnectionModel from "../models/connectionRequest.model.js";
import UserModel from "../models/user.model.js";

import { onlineUser } from "./onlineUser.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  //   socket middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();

    // User Online
    onlineUser.set(userId, socket.id);

    // console.log("Connected:", socket.user.firstName);
    // console.log("Online Users:", onlineUser.size);
    // handle event
    // console.log("Connected",socket.user.firstName);

    // socket.on("joinChat",({firstName,userId,targetUserId})=>{
    //   const roomId = [userId,targetUserId].sort().join("_");

    //   console.log("joinroom " + roomId)
    //   socket.join(roomId);
    // })

    socket.on("joinChat", ({ targetUserId }) => {
      const userId = socket.user._id;
      const roomId = [userId, targetUserId].sort().join("_");

    //   console.log("joinroom " + roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ targetUserId, text }) => {
      // save message to the db
      try {
        const userId = socket.user._id;
        const firstName = socket.user.firstName;

        // friend check
        const connection = await ConnectionModel.findOne({
          $or: [
            {
              sender: userId,
              receiver: targetUserId,
              status: "ACCEPTED",
            },
            {
              sender: targetUserId,
              receiver: userId,
              status: "ACCEPTED",
            },
          ],
        });
        if (!connection) {
          return socket.emit("messageError", {
            message: "You are not connected with this user",
          });
        }

        const roomId = [userId, targetUserId].sort().join("_");
        let chat = await chatModel.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new chatModel({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();
        io.to(roomId).emit("messageReceived", {
          firstName,
          senderId: userId,
          text,
          timestamp: new Date(),
        });
        // console.log("message recievied", firstName + text);
      } catch (error) {
        console.log(error);
      }
      //  io.to(roomId).emit("messageReceived", {firstName,text})
    });

    socket.on("disconnect", async() => {
        try {
            onlineUser.delete(userId);
            await UserModel.findByIdAndUpdate(
                userId,
                { lastSeen: new Date(),}
            )
        //     console.log(
        //     "Disconnected:",
        //     socket.user.firstName
        //   );

        //   console.log(
        //     "Online Users:",
        //     onlineUsers.size
        //   );
        } catch (error) {
            console.log(error);
        }
    });
  });
};

export default initializeSocket;
