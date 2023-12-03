import express from 'express';
import { academicFacultyControler } from './academicFaculty.controler';
import { academicValidationSchema } from './academicFaculty.validation.schema';
import validateData from '../../middlewares/validationRequiest';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateData(academicValidationSchema.createAcademicFacultyValidationSchema),
  academicFacultyControler.createAcademicFacultyControler,
);

router.get('/', academicFacultyControler.getAllAcademicFacultyControler);

router.get(
  '/:facultyId',
  academicFacultyControler.getSingleAcademicFacultyControler,
);

router.patch(
  '/:facultyId',
  academicFacultyControler.updateAcademicFacultyControler,
);

export const academicFacultyRouter = router;
