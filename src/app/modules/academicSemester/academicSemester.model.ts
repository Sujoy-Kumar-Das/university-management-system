import mongoose from 'mongoose';
import { TAcademicSemesterMapper, TAcademicSemister } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterName,
} from './academicSemester.constant';

export const academicSemesterSchema = new mongoose.Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: String,
    code: {
      type: String,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
  },
  {
    timestamps: true,
  },
);

export const academicSemesterMapper: TAcademicSemesterMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};


academicSemesterSchema.pre('save', async function (next) {
  const isExists = await academicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isExists) {
    throw new Error('This semister already exists.');
  }
  next();
});

export const academicSemesterModel = mongoose.model<TAcademicSemister>(
  'academicSemester',
  academicSemesterSchema,
);
