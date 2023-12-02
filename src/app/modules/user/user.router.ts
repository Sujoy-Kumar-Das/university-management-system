import express from 'express';
import { userControler } from './user.controler';
import validateData from '../../middlewares/validationRequiest';
import { StudentValidationSchema } from '../students/student.validation';
const router = express.Router();

// create student
router.post(
  '/create-student',
  validateData(StudentValidationSchema),
  userControler.createUserInDBControler
);

export const userRouter = router;
