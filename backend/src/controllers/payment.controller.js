import { getRazorpayInstance } from "../utils/razorpay.js";
import Payment from "../models/payment.model.js";
import { membershipAmount } from "../utils/constants.js";

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