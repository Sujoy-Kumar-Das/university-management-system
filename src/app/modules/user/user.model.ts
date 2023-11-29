import { Schema, mongo } from 'mongoose';
import { TUserExistsMethod, Tuser } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<Tuser, TUserExistsMethod>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


// save password in database as hash
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.salt_pass),
  );
  next();
});


// delete password form response data
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};


UserSchema.statics.isUserExists = async function (id: string) {
  const isExists = await UserModel.findOne({ id });
  return isExists;
};

export const UserModel = mongoose.model<Tuser, TUserExistsMethod>(
  'User',
  UserSchema,
);
