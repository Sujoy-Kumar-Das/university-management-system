import mongoose from 'mongoose';
import status from 'http-status';
import { TErrorDescription } from '../interfaces/TError';

const handleCastError = (error: mongoose.Error.ValidationError) => {
  const errorDescription: TErrorDescription = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    statusCode: status.FORBIDDEN,
    message: 'Invalid ID',
    errorDescription,
  };
};

export default handleCastError;
