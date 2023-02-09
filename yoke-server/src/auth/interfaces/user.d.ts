import { Document } from 'mongoose';
export interface IUser extends Document {
  id?: string;
  email: string;
  password: string;
}

export type ICreateUser = Omit<IUser, 'verified'>;

export interface IUpdateUser {
  email?: string;
  password?: string;
}
