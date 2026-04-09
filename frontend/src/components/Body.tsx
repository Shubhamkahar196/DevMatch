import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Slice";
import { useEffect } from "react";
import type { RootState } from "../utils/Store";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store: RootState) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/get-profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
          navigate("/login");
        }

      console.log(err);
    }
  };
  useEffect(() => {
    
fetchUser();
    
    
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
