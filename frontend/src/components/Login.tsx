import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import DesignSchoolIllustration from "../assets/Illustration.png";

// Using a purple color scheme derived from image_4.png
const PRIMARY_COLOR = "bg-[#6C5CE7]"; // A vibrant purple
const PRIMARY_TEXT_COLOR = "text-[#6C5CE7]";
const SECONDARY_TEXT_COLOR = "text-[#A29BFE]"; // Lighter purple for subtler text
const INPUT_BORDER_COLOR = "border-[#D1D5DB]"; // Standard grey border
const HOVER_COLOR = "hover:bg-[#5A4BCF]"; // Darker purple hover state

const Login = () => {
  // const [email, setEmail] = useState("testing123@gmail.com");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("Shubham@13");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.user));
      return navigate("/");
      
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
      console.log(error);
    }
  };

  const handleSingup = async ()=>{
    try {
      const res = await axios.post(BASE_URL + "/auth/signup",{firstName,lastName,email,password},
        {withCredentials: true}
      )
       dispatch(addUser(res.data.data));
       return navigate("/profile");
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
      console.log(error);
    }
  }

  return (
   

    <div className="flex flex-col sm:flex-row min-h-screen w-full font-sans bg-[#F9FAFB] pt-16 sm:pt-0 overflow-x-hidden">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="relative aspect-4/5 sm:aspect-auto sm:h-[80%] w-full max-w-lg lg:max-w-2xl overflow-hidden rounded-3xl bg-[#F0F3FA] p-8 shadow-inner">
          <img
            src={DesignSchoolIllustration}
            alt="Design School Login Illustration"
            className="absolute inset-0 h-full w-full object-contain object-center scale-90"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:px-16 lg:px-24 xl:px-32 bg-white sm:bg-[#F9FAFB]">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-8 sm:p-10 rounded-3xl sm:shadow-lg">
          {/* Header text from image_4.png */}
          <div className="mb-10 text-center">
            <h2 className={`text-sm font-semibold ${SECONDARY_TEXT_COLOR}`}>
              Welcome to
            </h2>
            <h1
              className={`text-4xl font-extrabold ${PRIMARY_TEXT_COLOR} tracking-tight`}
            >
              DevMatch
            </h1>
          </div>

          <div className="space-y-6">
            { !isLoginForm && <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>
            </>}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-[#EF4444]">{error}</p>
            )}

            {/* <div className="flex items-center justify-between text-xs font-medium">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className={`accent-[#6C5CE7] h-4 w-4 rounded-md`}
                />
                <span className="text-[#111111]">Remember me</span>
              </label>
              <button
                type="button"
                className={`${PRIMARY_TEXT_COLOR} hover:underline`}
              >
                Forgot password
              </button>
            </div> */}

            <div className="pt-4">
              <button
                onClick={isLoginForm ? handleLogin : handleSingup}
                className={`w-full rounded-full ${PRIMARY_COLOR} py-3.5 text-lg font-bold text-white cursor-pointer transition-all ${HOVER_COLOR} active:scale-[0.98] shadow-md`}
              >
               {isLoginForm ? "Login" : "SingUp"} 
              </button>
            </div>

            <div className="pt-8 text-center text-xs font-medium">
             <p className="text-[#666666]">
  {isLoginForm
    ? "Don't have an account?"
    : "Already have an account?"}{" "}

  <button
    type="button"
    onClick={() => setIsLoginForm(!isLoginForm)}
    className={`font-semibold ${PRIMARY_TEXT_COLOR} cursor-pointer hover:underline`}
  >
    {isLoginForm ? "Sign Up" : "Login"}
  </button>
</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
