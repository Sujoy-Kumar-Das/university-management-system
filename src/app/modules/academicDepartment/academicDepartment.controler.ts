import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartmentIntoDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department Created Successfully.',
      data: result,
    });
  },
);

const getAllAcademicDepartmentIntoDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Departments Loaded Successfully.',
      data: result,
    });
  },
);

const getSingleAcademicDepartmentIntoDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department loaded Successfully.',
      data: result,
    });
  },
);

const updateAcademicDepartmentIntoDBControler = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentServices.updateAcademicDepartmenIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department Updated Successfully.',
      data: result,
    });
  },
);

export const academicDepartmentControler = {
  createAcademicDepartmentIntoDBControler,
  getAllAcademicDepartmentIntoDBControler,
  getSingleAcademicDepartmentIntoDBControler,
  updateAcademicDepartmentIntoDBControler,
};
