import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "IGNORED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);


 const ConnectionModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
 export default ConnectionModel