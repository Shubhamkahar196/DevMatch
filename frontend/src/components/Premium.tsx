import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../utils/constant";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });
      
console.log("VERIFY RESPONSE:", res.data);
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Error verifying premium user:", err);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (type: string) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevMatch",
        description: "Connect with other developers",
        order_id: orderId,

        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.email,
        },

        theme: {
          color: "#F37254",
        },

        handler: async function (response: any) {
          console.log("Payment Success:", response);

          await verifyPremiumUser();
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  if (isUserPremium) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-success shadow-lg max-w-md">
          <span>🎉 You are already a Premium User</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto gap-6 p-6 items-center justify-center min-h-[500px]">

      {/* Silver Card */}
      <div className="card bg-base-200 border border-base-300 shadow-xl rounded-2xl p-8 flex flex-col justify-between h-[420px] w-full max-w-sm">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl uppercase">
            Silver
          </h2>

          <div className="my-4">
            <span className="text-4xl font-bold">₹299</span>
            <span className="text-sm opacity-70"> / 3 Months</span>
          </div>
        </div>

        <ul className="space-y-3">
          <li>✓ Chat with other people</li>
          <li>✓ 100 Connection Requests / day</li>
          <li>✓ Blue Tick Verification</li>
          <li>✓ 3 Months Access</li>
        </ul>

        <button
          onClick={() => handleBuyClick("silver")}
          className="btn btn-secondary mt-6"
        >
          Get Silver
        </button>
      </div>

      {/* Gold Card */}
      <div className="card bg-base-200 border-2 border-primary shadow-2xl rounded-2xl p-8 flex flex-col justify-between h-[450px] w-full max-w-sm relative">
        <span className="absolute -top-3 right-6 badge badge-primary">
          POPULAR
        </span>

        <div className="text-center">
          <h2 className="font-extrabold text-2xl text-primary uppercase">
            Gold
          </h2>

          <div className="my-4">
            <span className="text-4xl font-bold">₹699</span>
            <span className="text-sm opacity-70"> / 12 Months</span>
          </div>
        </div>

        <ul className="space-y-3">
          <li>✦ Chat with other people</li>
          <li>✦ Unlimited Requests / day</li>
          <li>✦ Premium Blue Tick</li>
          <li>✦ 12 Months Access</li>
        </ul>

        <button
          onClick={() => handleBuyClick("gold")}
          className="btn btn-primary mt-6"
        >
          Get Gold 🎉
        </button>
      </div>
    </div>
  );
};

export default Premium;