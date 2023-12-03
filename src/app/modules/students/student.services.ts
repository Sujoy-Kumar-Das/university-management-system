import { ObjectId } from 'mongodb';
import { StudentModel } from './student.model';

const getAllStudentFromFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromFromDB = async (id:string) => {
  const result = await StudentModel.findOne({ _id: new ObjectId(id) });
  return result;
};

export const studentService = {
  getAllStudentFromFromDB,
  getSingleStudentFromFromDB,
};
