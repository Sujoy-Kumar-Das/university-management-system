import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

// add student in db
const createStudnetInDB = async (studentData:TStudent) => {
  const result = StudentModel.create(studentData);
  return result;
};


export const studentService = {
    createStudnetInDB
}