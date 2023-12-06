import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { academicSemester } from '../modules/academicSemester/academicSemester.router';
import { studentRouter } from '../modules/students/student.router';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';

const router = Router();

const moduleRouters = [
  { path: '/users', router: userRouter },
  { path: '/students', router: studentRouter },
  { path: '/academicSemester', router: academicSemester },
  { path: '/academicFaculty', router: academicFacultyRouter },
  { path: '/academicDepartment', router: academicDepartmentRouter },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
