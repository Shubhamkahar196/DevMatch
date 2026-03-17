import express from 'express'
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import SignupRouter from './routes/auth.route.js'
import loginRouter from './routes/auth.route.js'

import getProfileRouter from './routes/user.route.js';

dotenv.config();
const app = express();
connectDb();
const PORT = 8000

app.use(cookieParser());
app.use(express.json());

// Routing

app.use("/auth",SignupRouter);
app.use("/auth",loginRouter);

// user routing
app.use("/user",getProfileRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})