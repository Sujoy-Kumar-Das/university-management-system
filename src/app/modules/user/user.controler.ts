import { NextFunction, Request, Response } from 'express';
import { userService } from './user.services';
import { StudentValidationSchema } from '../students/student.validation';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createUserInDBControler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, studentData } = req.body;
    const validate = StudentValidationSchema.parse(studentData);
    const result = await userService.createUserInDB(password, validate);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully.',
      data: result,
    });
  },
);

export const userControler = {
  createUserInDBControler,
};
