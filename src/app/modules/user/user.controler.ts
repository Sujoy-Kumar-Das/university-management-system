import { Request, Response } from 'express';
import { userService } from './user.services';

const createUserInDBControler = async (req: Request, res: Response) => {
  try {
    const { password, studentData } = req.body;
    const result = await userService.createUserInDB(password, studentData);
    res.send(result);
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'something went wrong.',
      error: error,
    });
  }
};

export const userControler = {
  createUserInDBControler,
};
