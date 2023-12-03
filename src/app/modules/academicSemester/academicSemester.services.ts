import { ObjectId } from 'mongodb';
import { TAcademicSemister } from './academicSemester.interface';
import {
  academicSemesterMapper,
  academicSemesterModel,
} from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemister) => {
  if (academicSemesterMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Invalid semester code.');
  }
  const result = await academicSemesterModel.create(payLoad);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemesterModel.findById({
    _id: new ObjectId(id),
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
