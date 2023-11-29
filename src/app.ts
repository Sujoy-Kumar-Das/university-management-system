import express from 'express';
import cors from 'cors';
import { studentRouter } from './app/modules/students/student.router';
import { userRouter } from './app/modules/user/user.router';
const app = express();

// express middlewares
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

export default app;
