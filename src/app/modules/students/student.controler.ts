import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.services';

const getAllStudentFromDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await studentService.getAllStudentFromFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All student loaded successfully.',
      data: result,
    });
  },
);

const getSingleStudentFromDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await studentService.getSingleStudentFromFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student loaded successfully.',
      data: result,
    });
  },
);

const deleteStudentFromDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await studentService.deleteStudentFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student deleted successfully.',
      data: result,
    });
  },
);

export const studentControler = {
  getAllStudentFromDBControler,
  getSingleStudentFromDBControler,
  deleteStudentFromDBControler,
};
