// import Razorpay from 'razorpay'

// var instance = new Razorpay({
//   key_id:process.env.RAZORPAY_KEY_ID,
//   key_secret:process.env.RAZORPAY_KEY_SECRET,
  
// });

import Razorpay from "razorpay";

export const getRazorpayInstance = () => {
  console.log("KEY:", process.env.RAZORPAY_KEY_ID);

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export default getRazorpayInstance