import { getRazorpayInstance } from "../utils/razorpay.js";
import Payment from "../models/payment.model.js";
import { membershipAmount } from "../utils/constants.js";

import {validateWebhookSignature} from 'razorpay/dist/utils/razorpay-utils.js'
import UserModel from "../models/user.model.js";

// making payment
export const createOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    
    const {membershipType} = req.body
    const {firstName,lastName,email} = req.user;

    const order = await razorpay.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: true,
      notes: {
        firstName,
        lastName,
        email,
        membershipType: membershipType,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receiptId: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
      
    res.json({...savedPayment.toJSON(),keyId: process.env.RAZORPAY_KEY_ID})
    // res.status(201).json({
    //   success: true,
    //   data: savedPayment,
    //   keyId: process.env.RAZORPAY_KEY_ID
    // });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// webhook
export const webhooks = async (req,res)=>{
  try {
     const webhookSignature = req.get['X-Razorpay-Signature'];
     
     const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body), 
      webhookSignature, 
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if(!isWebhookValid){
      return res.status(400).json({
        msg: "webhook signature is invalid"
      })
    }
     
    // update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({orderId: paymentDetails.order_id});
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await UserModel.findOne({_id: payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();
    // update the user as premium


    //return success response to razorpay

    // if(req.body.event ==='payment.captured'){

    // }

    // if(req.body.event ==='payment.failed'){

    // }

  return res.status(200).json({
    msg: "Webhook recieved successfully"
  })

  } catch (error) {
    return res.status(500).json({msg: err.meesage})
  }
}

