// import io from 'socket.io-client'
// import BASE_URL from './constant'

// export const createSocketConnection = () =>{
//     return io(BASE_URL)
// }


import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io(
    location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://www.devmatch.website"
  );
};