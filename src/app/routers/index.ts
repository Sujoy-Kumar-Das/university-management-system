import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { academicSemester } from '../modules/academicSemester/academicSemester.router';

const router = Router();

const moduleRouters = [
  { path: '/users', router: userRouter },
  { path: '/academicSemester', router: academicSemester },
];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
