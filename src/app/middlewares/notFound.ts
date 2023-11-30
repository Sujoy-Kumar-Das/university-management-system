import { NextFunction, Request, Response } from 'express';

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success: false,
    message: 'API Not found.',
    error: '',
  });
};

export default notFoundErrorHandler;
