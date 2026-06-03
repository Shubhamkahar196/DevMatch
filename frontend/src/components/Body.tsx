import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";

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
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/get-profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user || res.data));
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosErr = err as any;
      if (axiosErr?.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default Body;
