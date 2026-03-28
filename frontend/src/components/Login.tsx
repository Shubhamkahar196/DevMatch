import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slice";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();

  const handleLogin = async()=>{
   try {
    const res = await axios.post("http://localhost:8000/auth/login",
      {email,password},
    {withCredentials:true})
    console.log(res.data);
    dispatch(addUser(res.data));
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
