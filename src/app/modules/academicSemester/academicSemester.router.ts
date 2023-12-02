import express from 'express';
import { academicSemesterControler } from './academicSemester.conteroler';
import validateData from '../../middlewares/validationRequiest';
import { academicSemesterValidationSchema } from './academicSemester.validation.schema';
const router = express.Router();

router.post(
  '/create-semester',
  validateData(
    academicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControler.createSemisterIntoDBControler,
);

router.get('/', academicSemesterControler.getAllAcademicSemesterControler);

router.get(
  '/:id',
  academicSemesterControler.getSingleAcademicSemesterControler,
);

export const academicSemester = router;
