import express from 'express';
import { userControler } from './user.controler';
const router = express.Router();

// create student
router.post('/create-student', userControler.createUserInDBControler);

export const userRouter = router;
