import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.services';
import status from 'http-status';

const getAllStudentFromDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await studentService.getAllStudentFromFromDB(req.query);
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

const updateStudentFromDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { studentData } = req.body;
    const result = await studentService.updateStudentFromDB(id, studentData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student updated successfully.',
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
  updateStudentFromDBControler,
  deleteStudentFromDBControler,
};
