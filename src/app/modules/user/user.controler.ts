import { NextFunction, Request, Response } from 'express';
import { userService } from './user.services';
import { StudentValidationSchema } from '../students/student.validation';

const createUserInDBControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, studentData } = req.body;
    const validate = StudentValidationSchema.parse(studentData);
    const result = await userService.createUserInDB(password, validate);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const userControler = {
  createUserInDBControler,
};
