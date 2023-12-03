import { TAcademicSemister } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const getLastUserId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genareteUserId = async (payLoad: TAcademicSemister | null) => {
  let currentId = (0).toString();

  const lastStudent = await getLastUserId();
  const lastStudentYear = lastStudent?.substring(0, 4);
  const lastStudentCode = lastStudent?.substring(4, 6);
  const currentSemesterCode = payLoad?.code;
  const currentSemesterYear = payLoad?.year;
  if (
    lastStudent &&
    lastStudentYear === currentSemesterYear &&
    lastStudentCode === currentSemesterCode
  ) {
    currentId = lastStudent.substring(6);
  }
  
  let userId = (Number(currentId) + 1).toString().padStart(4, '0');
  userId = `${payLoad?.year}${payLoad?.code}${userId}`;
  return userId;
};
