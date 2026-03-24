import ConnectionModel from "../models/connectionRequest.model.js";

// send request  -> post /request/send/:userId
export const sendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;
    const { status } = req.body; // PENDING or IGNORED

    if (senderId.toString() === receiverId) {
      return res.status(400).json({
        message: "You cannot send request to yourself",
      });
    }

    // check existing request (both directions)
    const existing = await ConnectionModel.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existing) {
      return res.status(400).json({
        message: "Request already exists",
      });
    }

    const request = await ConnectionModel.create({
      sender: senderId,
      receiver: receiverId,
      status: status || "PENDING",
    });

    res.status(201).json({
      success: true,
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get /request

export const getRequest = async (req,res)=>{
  try {
     const request = await ConnectionModel.find({
      receiver: req.user._id,
      status: "Pending"
     }).populate("sender","firstName lastName")

     res.json({
      success: true,
      data: request,
     });
  } catch (error) {
    console.log("Error while getting getRequest",error);
    res.status(500).json({
      message: error.message
    })
  }
}

