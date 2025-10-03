import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconnection.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = 8000;

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}
))

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});