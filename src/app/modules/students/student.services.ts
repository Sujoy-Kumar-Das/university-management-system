import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import status from 'http-status';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromFromDB = async (query: Record<string, unknown>) => {
  // copy query object
  const queryCopy = { ...query };

  // initial value of query keywords
  let searchKeyword = '';
  let sort = '-createdAt';
  let limit = 1;
  let page = 1;
  let skip = 0;
  let fields = '-__v';

  if (query.searchTerm) {
    searchKeyword = query.searchTerm as string;
  }
  if (query.sort) {
    sort = query.sort as string;
  }
  if (query.limit) {
    limit = Number(query.limit) as number;
  }

  if (query.page) {
    page = Number(query.page) as number;
    skip = (page - 1) * limit;
  }

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const searchFields = [
    'name.firstName',
    'name.middleName',
    'name.lastName',
    'email',
  ];

  const exculdeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  exculdeFields.forEach((element) => delete queryCopy[element]);
  const searchQuery = StudentModel.find({
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchKeyword, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery
    .find(queryCopy)
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  const sortQuery = filterQuery.sort(sort);

  const paginateQuery = sortQuery.skip(skip).limit(limit);
  const fieldLimitingQuery = paginateQuery.select(fields);
  const result = await fieldLimitingQuery;

  return result;
};
const getSingleStudentFromFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remaingFields } = payLoad;
  const modifiedData: Record<string, unknown> = { ...remaingFields };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate({ id }, modifiedData, {
    new: true,
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
      { new: true, sesseion },
    );
    if (!deleteStudent) {
      throw new AppError(status.BAD_REQUEST, 'Faild to delete student.');
    }

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, sesseion },
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
  updateStudentFromDB,
  deleteStudentFromDB,
};
