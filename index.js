import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbConfig.js';
import router from './routes/customerRoutes.js';
import userRouter from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/order", router)
app.use("/api/user", userRouter)

app.get('/', (req, res) =>{
    res.send("Port Chal Raha Hai")
});

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Port listening on ${process.env.PORT}`)
});