import express from 'express';
import { academicDepartmentControler } from './academicDepartment.controler';
const router = express.Router();

router.post(
  '/create-academicDepartment',
  academicDepartmentControler.createAcademicDepartmentIntoDBControler,
);

router.get(
  '/',
  academicDepartmentControler.getAllAcademicDepartmentIntoDBControler,
);

router.get(
  '/:departmentId',
  academicDepartmentControler.getSingleAcademicDepartmentIntoDBControler,
);

router.patch(
  '/:departmentId',
  academicDepartmentControler.updateAcademicDepartmentIntoDBControler,
);

export const academicDepartmentRouter = router;
