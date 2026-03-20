import express from 'express'
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route.js'

import userRouter from './routes/user.route.js'

dotenv.config();
const app = express();
connectDb();
const PORT = 8000

app.use(cookieParser());
app.use(express.json());


// auth router
app.use("/auth",authRouter);


// user routing
app.use("/user",userRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})