import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice'
// import feedReduer from './FeedSlice'
import feedReduer from './feedSlice'

 const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReduer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store