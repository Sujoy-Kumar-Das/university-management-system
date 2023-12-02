import { Request, Response } from 'express';
import { userService } from './user.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createUserInDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, studentData } = req.body;
    const result = await userService.createUserInDB(password, studentData);
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
