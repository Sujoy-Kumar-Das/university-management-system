import status from 'http-status';
import { TErrorDescription } from '../interfaces/TError';
const handleDuplicateError = (error: any) => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorDescription: TErrorDescription = [
    {
      path: '',
      message: `${extractedMessage} Faculty already exists.`,
    },
  ];
  return {
    statusCode: status.FORBIDDEN,
    message: `${extractedMessage} Faculty already exists.`,
    errorDescription,
  };
};

export default handleDuplicateError;
