import { Model, Schema, model } from 'mongoose';

export interface Tuser {
  id: string;
  password?: string;
  needsPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserExistsMethod extends Model<Tuser> {
  isUserExists(id: string): Promise<Tuser | null>;
}
