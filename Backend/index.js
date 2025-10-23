import express from 'express';
import dotenv from 'dotenv';

// Load environment variables before importing other modules
dotenv.config();


import connectDB from './config/dbconnection.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import SEORouter from './routes/seo.route.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import Idearouter from './routes/idea.routes.js';
import ScriptRouter from './routes/script.route.js';
import calendarRouter from './routes/calendar.routes.js';
import savedRouter from './routes/saved.routes.js';
import ProfileRouter from './routes/profile.routes.js';
import debugRouter from './routes/debug.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(cookieparser());
// Allow the frontend origin (set FRONTEND_URL in production .env). Default to local dev origin.
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({


  origin: FRONTEND_URL,

  credentials: true
}))

//Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use("/api/ideas",Idearouter);
app.use('/api/seo', SEORouter);
app.use("/api/script",ScriptRouter);
app.use("/api/calendar",calendarRouter);
app.use('/api/saved',savedRouter);
app.use('/api/profile',ProfileRouter);
app.use('/api/debug', debugRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

});


