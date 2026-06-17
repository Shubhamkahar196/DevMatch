import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../utils/constant';

const Premium = () => {
  const [isPremium,setIsUserPremium] = useState(false);

  const verifyPremiumUser = async ()=>{
    const res = await axios.get(BASE_URL + "/payment/verify",{
      withCredentials: true,
    });

    if(res.data.isPremium){
      setIsUserPremium(true);
    }
  }

  const handleBuyClick = async(type)=>{

    const order= await axios.post(BASE_URL + "/payment/create", {
      membershipType: type,
    },{withCredentials: true});


const {amount,keyId,currency,notes,orderId} = order.data;
    // it should open the razor pay dialog box
    const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: 'DevMatch',
        description: 'Connect with other developer',
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          // contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser
      };

    const rzp = new (window as any).Razorpay(options);
      rzp.open();
  }
  return  isPremium ? (
    "You are already a premium user" ) : (
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto gap-6 p-6 items-center justify-center min-h-125">
      
      {/* Silver Membership Card */}
      <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-8 flex flex-col justify-between h-105 w-full max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl text-base-content/80 uppercase tracking-wider">Silver</h2>
          <div className="my-4">
            <span className="text-4xl font-bold">299Rs</span>
            <span className="text-base-content/60 text-sm"> / 3 Mos</span>
          </div>
        </div>
        
        <ul className="space-y-3 my-6 text-sm md:text-base">
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> Chat with other people
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> 100 Connection Requests / day
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> Blue Tick verification
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> 3 Months Access
          </li>
        </ul>
        
        <button onClick={()=>handleBuyClick("silver")}  className="btn btn-secondary btn-block rounded-xl font-bold tracking-wide shadow-lg shadow-secondary/20">
          Get Silver
        </button>
      </div>

      {/* Divider */}
      <div className="divider lg:divider-horizontal font-bold text-sm text-base-content/40 my-2 lg:my-0">OR</div>

      {/* Gold Membership Card (Featured/Popular) */}
      <div className="card bg-linear-to-br from-base-300 to-base-200 border-2 border-primary shadow-2xl rounded-2xl p-8 flex flex-col justify-between h-112.5 w-full max-w-sm relative transition-all duration-300 hover:scale-105">
        {/* Popular Tag */}
        <span className="absolute -top-3 right-6 badge badge-primary font-semibold py-3 px-4 shadow-md">
          POPULAR
        </span>

        <div className="text-center">
          <h2 className="font-extrabold text-2xl text-primary uppercase tracking-wider">Gold</h2>
          <div className="my-4">
            <span className="text-4xl font-bold">699Rs</span>
            <span className="text-base-content/60 text-sm"> / 12 Mos</span>
          </div>
        </div>
        
        <ul className="space-y-3 my-6 text-sm md:text-base">
          <li className="flex items-center gap-2 font-medium">
            <span className="text-primary">✦</span> Chat with other people
          </li>
          <li className="flex items-center gap-2 font-medium">
            <span className="text-primary">✦</span> Infinite Requests / day
          </li>
          <li className="flex items-center gap-2 font-medium">
            <span className="text-primary">✦</span> Premium Blue Tick
          </li>
          <li className="flex items-center gap-2 font-medium">
            <span className="text-primary">✦</span> 12 Months Access
          </li>
        </ul>
        
        <button onClick={()=>handleBuyClick("gold")} className="btn btn-primary btn-block rounded-xl font-bold tracking-wide shadow-lg shadow-primary/30 animate-pulse-slow">
          Get Gold 🎉
        </button>
      </div>
      
    </div> 

  );
};

export default Premium;