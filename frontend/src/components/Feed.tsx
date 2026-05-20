import axios, { AxiosError } from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../utils/Store";
import { useEffect, useState } from "react";

import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store: RootState) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true});
      
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
      console.log("error in feed", err);
      navigate("/login");
    }
  };


  useEffect(()=>{
    getFeed();
  },[])


  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-base-content/60 bg-base-200 px-6 py-4 rounded-2xl shadow-sm">
          No new User Found
        </h1>
      </div>
    )
  }

   

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  )
};

export default Feed;
