import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { acdemicFacultyService } from './academicFaculty.services';

const createAcademicFacultyControler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await acdemicFacultyService.createAcademicFacultyInDB(
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic faculty created successfully.',
      data: result,
    });
  },
);

const getAllAcademicFacultyControler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await acdemicFacultyService.getAllAcademicFacultyFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All faculty loaded succesfully.',
      data: result,
    });
  },
);

const getSingleAcademicFacultyControler = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await acdemicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty loaded succesfully.',
      data: result,
    });
  },
);

const updateAcademicFacultyControler = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await acdemicFacultyService.updateAcademicFacultyFromDB(
      facultyId,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty updated succesfully.',
      data: result,
    });
  },
);


export const academicFacultyControler = {
  createAcademicFacultyControler,
  getAllAcademicFacultyControler,
  getSingleAcademicFacultyControler,
  updateAcademicFacultyControler,
};
