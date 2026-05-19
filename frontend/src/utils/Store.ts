import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice'
// import feedReduer from './FeedSlice'
import feedReduer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestReducer from "./requestSlice"

 const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReduer,
        connections: connectionReducer,
        requests: requestReducer
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store