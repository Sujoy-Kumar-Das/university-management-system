import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TErrorDescription } from '../interfaces/TError';
import { ZodError } from 'zod';
import handleZodError from '../error/zodErrorHandler';
import handleMongooseError from '../error/handleMongooseError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleCastError from '../error/handleCastError';
import AppError from '../error/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let errorDescription: TErrorDescription = [
    {
      path: error.path || ' ',
      message: error.message || 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDescription = simplifiedError.errorDescription;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDescription = simplifiedError.errorDescription;
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDescription = simplifiedError.errorDescription;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDescription = simplifiedError.errorDescription;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorDescription = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorDescription = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDescription,
    // error,
  });
};

export default globalErrorHandler;
