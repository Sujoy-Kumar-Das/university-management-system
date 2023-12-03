import express from 'express';
import { studentControler } from './student.controler';
const router = express.Router();

// get all student
router.get('/', studentControler.getAllStudentFromDBControler);

router.get('/:id', studentControler.getSingleStudentFromDBControler);


export const studentRouter = router;
