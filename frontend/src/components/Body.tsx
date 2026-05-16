// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import BASE_URL from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../utils/Slice";
// import { useEffect } from "react";
// import type { RootState } from "../utils/Store";

// const Body = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((store: RootState) => store.user);

//   const fetchUser = async () => {
//     if(userData) return;
//     try {
//       const res = await axios.get(BASE_URL + "/user/get-profile", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data.user));
//     } catch (err) {
//       const error = err as AxiosError;
//       if (error.response?.status === 401) {
//           navigate("/login");
//         }

//       console.log(err);
//     }
//   };
//   useEffect(() => {
    
// fetchUser();
    
    
//   }, []);
//   return (
//     <div className="pt-16">
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// export default Body;


import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Slice";
import { useEffect, useState } from "react";
import type { RootState } from "../utils/Store";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store: RootState) => store.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // If user data is already in Redux, stop loading and don't refetch
      if (userData) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await axios.get(BASE_URL + "/user/get-profile", {
          withCredentials: true,
        });
        
        
        
        dispatch(addUser(res.data.user || res.data));
      } catch (err) {
        const error = err as AxiosError;
        console.error("Session verification failed:", error);
        
        // Only redirect to login if they aren't already heading there
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-300 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#6C5CE7]"></span>
      </div>
    );
  }

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