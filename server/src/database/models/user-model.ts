import { Schema, model } from 'mongoose';
import { Role } from '../../enums/role-enum';
import { IUser } from '../../interfaces/user-interface';

const User = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: Role.User,
  },
});

export default model('Users', User);
