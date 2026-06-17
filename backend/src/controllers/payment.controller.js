// import express from 'express';
// // import razorpayInstance from '../utils/razorpay.js'
// import { getRazorpayInstance } from "../utils/razorpay.js";

// const razorpay = getRazorpayInstance();


// export const createOrder = async(req,res)=>{
    
//     try{

//   const order= await razorpay.orders.create({
//   "amount": 50000,
//   "currency": "INR",
//   "receipt": "receipt#1",
//   "partial_payment": true,
//   "notes": {
//     firstName: "value3",
//     lastName: "value2",
//     membershipType: "silver"
//   }
 
// })

// //   save it in my db
// console.log(order)
// // return back my order details to frontend
// res.json({order})

//     }catch(err){
// console.log(err)
//     }
// }


import { getRazorpayInstance } from "../utils/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: true,
      notes: {
        firstName: "value3",
        lastName: "value2",
        membershipType: "silver",
      },
    });

    console.log(order);

    res.json({ order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};