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
      console.log(res);
      dispatch(addFeed(res.data.data))
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

   

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  )
};

export default Feed;
