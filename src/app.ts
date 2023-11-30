import express from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFound';
import router from './app/routers';
const app = express();

// express middlewares
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFoundErrorHandler);

export default app;
