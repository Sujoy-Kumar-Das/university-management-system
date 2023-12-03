import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'academic faculty name is required.'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isAlreadyExists = await academicFacultyModel.findOne({
    name: this.name,
  });
  if (isAlreadyExists) {
    throw new Error('Academic faculty already exits.');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAlreadyExists = await academicFacultyModel.findById(query);
  if (!isAlreadyExists) {
    throw new Error('This academic faculty does not exits.');
  }
  next();
});

export const academicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);
