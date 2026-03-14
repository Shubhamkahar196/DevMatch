import express from 'express'
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import SignupRouter from './routes/auth.route.js'
import loginRouter from './routes/auth.route.js'

dotenv.config();
const app = express();
connectDb();
const PORT = 8000

app.use(express.json());

// Routing

app.use("/auth",SignupRouter);
app.use("/auth",loginRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})