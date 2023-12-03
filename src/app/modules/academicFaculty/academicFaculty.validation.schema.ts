import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Faculty name is required.' }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Faculty name is required.' })
      .optional(),
  }),
});

export const academicValidationSchema = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
