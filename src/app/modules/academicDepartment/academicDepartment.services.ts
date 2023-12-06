import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (paylaod: string) => {
  const result = await academicDepartmentModel.findById(paylaod);
  return result;
};

const updateAcademicDepartmenIntoDB = async (
  id: string,
  paylaod: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel.findByIdAndUpdate(id, paylaod, {
    new: true,
  });
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmenIntoDB,
};
