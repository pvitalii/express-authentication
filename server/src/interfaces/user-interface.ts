import { ObjectId } from 'mongoose';
import { Role } from '../enums/role-enum';

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  role: Role;
  _v: number;
}
