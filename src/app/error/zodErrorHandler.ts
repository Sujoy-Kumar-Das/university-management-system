import { ZodError, ZodIssue } from 'zod';
import { TErrorDescription } from '../interfaces/TError';
import status from 'http-status';

const handleZodError = (error: ZodError) => {
  const errorDescription: TErrorDescription = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue.message,
      };
    },
  );
  return {
    statusCode: status.FORBIDDEN,
    message: 'Validation error',
    errorDescription,
  };
};

export default handleZodError;
