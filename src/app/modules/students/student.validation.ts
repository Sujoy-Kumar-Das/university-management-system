import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must have at least 1 character' })
    .max(20, { message: 'First name cannot exceed 20 characters' }),
  middleName: z
    .string()
    .max(20, { message: 'Middle name cannot exceed 20 characters' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must have at least 1 character' })
    .max(20, { message: 'Last name cannot exceed 20 characters' }),
});

const GuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name must have at least 1 character' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation must have at least 1 character' }),
  fatherContactNo: z.string().min(1, {
    message: 'Father contact number must have at least 1 character',
  }),
  motherName: z
    .string()
    .min(1, { message: 'Mother name must have at least 1 character' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation must have at least 1 character' }),
  motherContactNo: z.string().min(1, {
    message: 'Mother contact number must have at least 1 character',
  }),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name must have at least 1 character' }),
  occupation: z
    .string()
    .min(1, { message: 'Occupation must have at least 1 character' }),
  contactNo: z
    .string()
    .min(1, { message: 'Contact number must have at least 1 character' }),
  address: z
    .string()
    .min(1, { message: 'Address must have at least 1 character' }),
});

export const StudentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID must have at least 1 character' }),
  user: z
    .string()
    .min(1, { message: 'User ID must have at least 1 character' }),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }),
  contactNo: z
    .string()
    .min(1, { message: 'Contact number must have at least 1 character' }),
  emergencyContactNo: z.string().min(1, {
    message: 'Emergency contact number must have at least 1 character',
  }),
  bloogGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  addmisionSemister: z.string().min(1, {
    message: 'Student admission semester must have at least 1 character',
  }),
  presentAddress: z
    .string()
    .min(1, { message: 'Present address must have at least 1 character' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address must have at least 1 character' }),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
});
