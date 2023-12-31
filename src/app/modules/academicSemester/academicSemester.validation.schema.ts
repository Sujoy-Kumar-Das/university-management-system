import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from './academicSemester.constant';
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]]),
    endMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]]),
  }),
});

export const academicSemesterValidationSchema = {
  createAcademicSemesterValidationSchema,
};
