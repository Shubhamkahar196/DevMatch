import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

const Login = () => {
  const [email,setEmail] = useState("testing123@gmail.com");
  const [password,setPassword] = useState("Shubham@13")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async()=>{
    
   try {
    
    const res = await axios.post(BASE_URL + "/auth/login",
      {email,password},
    {withCredentials:true})

    dispatch(addUser(res.data.user));
    navigate("/feed")
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className="flex items-center justify-center py-6">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-5">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" value ={password} onChange={(e)=>setPassword(e.target.value)} className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
