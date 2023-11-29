import express from 'express';
import { studentControler } from './student.controler';
const router = express.Router();

// create student
// router.post('/create-student', studentControler.createStudentInDB);

export const studentRouter = router;
