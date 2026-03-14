import express from 'express'
import connectDb from './config/db';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
connectDb();
const PORT = 8000

app.use(express.json());

// Routing

app.use("/auth",);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})