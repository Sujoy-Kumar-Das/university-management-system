import { ObjectId } from 'mongodb';
import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import status from 'http-status';
import { UserModel } from '../user/user.model';

const getAllStudentFromFromDB = async () => {
  const result = await StudentModel.find()
    // .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    // .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const sesseion = await mongoose.startSession();

  try {
    sesseion.startTransaction();

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deleteStudent) {
      throw new AppError(status.BAD_REQUEST, 'Faild to delete student.');
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );

    if (!deleteUser) {
      throw new AppError(status.BAD_REQUEST, 'Faild to delete user.');
    }

    await sesseion.commitTransaction();
    await sesseion.endSession();
    return deleteStudent;
  } catch (error) {
    await sesseion.abortTransaction();
    await sesseion.endSession();
    throw new AppError(
      status.BAD_REQUEST,
      'Something went wrong while deleteing user.please try again later.',
    );
  }
};
export const studentService = {
  getAllStudentFromFromDB,
  getSingleStudentFromFromDB,
  deleteStudentFromDB,
};
