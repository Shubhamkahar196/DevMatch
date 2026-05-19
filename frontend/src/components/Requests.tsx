import axios from "axios"
import BASE_URL from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requestSlice"
import type { RootState } from "../utils/Store"


const Requests = () => {

  const requests = useSelector( (store:RootState)=> store.requests)
  const dispatch = useDispatch()

  const fetchRequest = async ()=>{
    try {
      const res = await axios.get(BASE_URL + "/request/",{withCredentials: true})
      console.log(res.data.data);
      dispatch(addRequest(res.data.data))

    
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
      fetchRequest();
    },[])

    if(!requests) return;
    if(requests.length ===0) {
      return <h1>No Request found</h1>
    }
  return (
    <div>Request</div>
  )
}

export default Requests