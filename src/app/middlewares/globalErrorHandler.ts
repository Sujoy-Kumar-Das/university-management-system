import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error || 'Server error. Please try again later.',
  });
};

export default globalErrorHandler;
