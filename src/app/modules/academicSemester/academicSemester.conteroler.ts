import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.services';
import sendResponse from '../../utils/sendResponse';

const createSemisterIntoDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic semister created successfully. ',
      data: result,
    });
  },
);

const getAllAcademicSemesterControler = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All academic semester loaded successfully.',
      data: result,
    });
  },
);

const getSingleAcademicSemesterControler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await academicSemesterServices.getSingleAcademicSemesterFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student loaded successfully',
      data: result,
    });
  },
);

export const academicSemesterControler = {
  createSemisterIntoDBControler,
  getAllAcademicSemesterControler,
  getSingleAcademicSemesterControler,
};
