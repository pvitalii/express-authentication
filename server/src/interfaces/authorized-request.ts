import { Request } from 'express';
import { IUser } from './user-interface';

export interface AuthorizedRequest extends Express.User {
  user: Omit<IUser, 'password'>;
}
