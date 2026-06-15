import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import connectDb from './config/db.js';

import cors from 'cors';
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import connectionRouter from './routes/connection.route.js'
import legalRouter from './routes/legal.route.js'
import paymentRouter from './routes/payment.route.js'

const app = express();


connectDb();
const PORT = 8000
import("./utils/cron-job.js")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());



// auth router
app.use("/auth",authRouter);
// user routing
app.use("/user",userRouter);
// connectionrouter
app.use("/request",connectionRouter);
// legal routing
app.use("/api", legalRouter);
// payment router
app.use("/payment",paymentRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})