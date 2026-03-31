
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE_URL from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/Slice'
import { useEffect } from 'react'


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async ()=>{
    try {
      const res = await axios.get(BASE_URL + "/user/get-profile",{
        withCredentials: true
      })
      dispatch(addUser(res.data.user))
    } catch (error) {
      navigate("/login")
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUser()
  },[]);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body