import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import status from 'http-status';
import AppError from '../../error/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic department is required.'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExists = await academicDepartmentModel.findOne({ name: this.name });
  if (isExists) {
    throw new AppError(403, 'This Department already exists.');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExists = await academicDepartmentModel.findById(query);

  if (!isExists) {
    throw new AppError(status.NOT_FOUND, 'This Department is not exists.');
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
