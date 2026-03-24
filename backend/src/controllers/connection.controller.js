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

// reviewRequest (Accept /Reject)
// post /request/review/:requestId
export const reviewRequest = async(req,res)=>{
  try {
    const {status} = req.body;  //accepted /Rejected
    const requestId = req.params.requestId;
    
    if(!["ACCEPTED","REJECTED"].includes(status)){
      return res.status(400).json({
        message: "Invalid status",
      })
    }

    const request = await ConnectionModel.findById(requestId);
    if(!request){
      return res.status(404).json({
        message: "Request not found",
      })
    }

    // only receiver can review
    if(request.receiver.toString() !== req.user._id.toString()){
      return res.status(403).json({
        message: "Not authorized",
      })
    }

    request.status = status;
    await request.save();

  } catch (error) {
    console.log("Error while reviewRequest",error);
    res.status(500).json({
      message: error.message
    })
  }
}

// Get connections(Matches)
// get /request/connections

export const getConnections = async(req,res)=>{
  try {
    const connections = await ConnectionModel.find({
      $or: [
        {sender: req.user._id, status:"ACCEPTED"},
        {receiver: req.user._id, status: "ACCEPTED"}
      ],
    }).populate("sender receiver", "firstName lastName");

    res.json({
      success: true,
      data: connections,
    })
  } catch (error) {
    console.log("Error while getting connections",error);
    res.status(500).json({
      message: error.message
    })
  }
}

// get Sent requests
// get /request/sent

export const getSentRequest = async(req,res)=>{
  try {
    const requests = await ConnectionModel.find({
      sender: req.user._id,
      status: "PENDING",
    }).populate("receiver", "FirstName lastName")
  } catch (error) {
    
    res.status(500).json({
      message: error.message
    })
  }
}