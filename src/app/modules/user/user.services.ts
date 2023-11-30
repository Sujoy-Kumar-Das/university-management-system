import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { Tuser } from './user.interface';
import { UserModel } from './user.model';

const createUserInDB = async (password: string, studentData: TStudent) => {
  if (await StudentModel.isUsersEmailExists(studentData.email)) {
    throw new Error('User already exists.');
  }
  const userData: Partial<Tuser> = {};
  userData.password = password || config.default_password;
  userData.role = 'student';

  //set manually generated it
  userData.id = '2030100002';

  const newUser = await UserModel.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const result = await StudentModel.create(studentData);
    return result;
  }
};

export const userService = {
  createUserInDB,
};
