import mongoose from 'mongoose';
import status from 'http-status';
import { TErrorDescription } from '../interfaces/TError';

const handleMongooseError = (error: mongoose.Error.ValidationError) => {
  const errorDescription: TErrorDescription = Object.values(error.errors).map(
    (value) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );

  return {
    statusCode: status.FORBIDDEN,
    message: 'Validation Error',
    errorDescription,
  };
};

export default handleMongooseError;
