import User from '../database/models/user-model';
import { Credentials } from '../interfaces/credentials-interface';
import { IUser } from '../interfaces/user-interface';

class UserService {
  async create(credentials: Credentials): Promise<IUser> {
    const user = new User(credentials);
    return user.save();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username }).lean();
  }
}

export default new UserService();
