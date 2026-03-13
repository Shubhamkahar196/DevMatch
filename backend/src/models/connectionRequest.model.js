import mongoose from 'mongoose';

const connectionRequestSchema = new mongoose.Schema({
   fromId: {
    type:Schema.type.ObjectId,
    ref: "User",
    required: true,
   },
   toUserId:{
    type:Schema.type.ObjectId,
    ref: "User",
    required: true,
   },
   status:{
    type:String,
    enum: [
        "PENDING",
        "ACCEPT",
        "REJECT",
        "IGNORE"
    ],
    default: "PENDING"
   }
})


const ConnectionModel = new model("ConnectionRequest",connectionRequestSchema);
export default ConnectionModel;