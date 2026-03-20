import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import connectDb from './config/db.js';

import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route.js'

import userRouter from './routes/user.route.js'


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