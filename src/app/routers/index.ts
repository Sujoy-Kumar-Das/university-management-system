import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';

const router = Router();

const moduleRouters = [{ path: '/users', router: userRouter }];

moduleRouters.forEach((route) => router.use(route.path, route.router));

export default router;
