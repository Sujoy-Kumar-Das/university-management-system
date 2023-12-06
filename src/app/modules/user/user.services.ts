import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { Tuser } from './user.interface';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { genareteUserId } from './user.utils';
import { UserModel } from './user.model';
import AppError from '../../error/AppError';
import mongoose from 'mongoose';
import status from 'http-status';

const createUserInDB = async (password: string, studentData: TStudent) => {
  if (await StudentModel.isUsersEmailExists(studentData.email)) {
    throw new AppError(403, 'User already exists.');
  }

  const session = await mongoose.startSession();
  const userData: Partial<Tuser> = {};
  userData.password = password || config.default_password;
  userData.role = 'student';

  const academicSemesterInfo = await academicSemesterModel.findById(
    studentData.academicSemester,
  );
  try {
    session.startTransaction(); // start transction
    //set auto generated it
    userData.id = await genareteUserId(academicSemesterInfo);

    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Faid to create user!');
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const result = await StudentModel.create([studentData], { session });
    if (!result.length) {
      throw new AppError(status.BAD_REQUEST, 'Faid to creare student!');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Server error for create student!');
  }
};

export const userService = {
  createUserInDB,
};
