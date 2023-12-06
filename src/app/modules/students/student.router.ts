import express from 'express';
import { studentControler } from './student.controler';
const router = express.Router();

// api routers
router.get('/', studentControler.getAllStudentFromDBControler);
router.get('/:id', studentControler.getSingleStudentFromDBControler);
router.delete('/:id', studentControler.deleteStudentFromDBControler);

export const studentRouter = router;
