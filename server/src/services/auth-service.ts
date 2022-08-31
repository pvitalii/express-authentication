import { Credentials } from '../interfaces/credentials-interface';
import userService from './user-service';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user-interface';
import { JwtPayload } from '../interfaces/jwt-payload-interface';
import { Token } from '../interfaces/token-interface';

class AuthService {
  async registration(credentials: Credentials): Promise<Token> {
    const user = await userService.create({
      username: credentials.username,
      password: await this.hashPassword(credentials.password),
    });
    const payload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };
    return {
      accessToken: await this.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        '60s',
      ),
      refreshToken: await this.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        '1d',
      ),
    };
  }

  async validateUser(
    credentials: Credentials,
  ): Promise<Omit<IUser, 'password'> | null> {
    const user = await userService.findByUsername(credentials.username);
    if (
      user &&
      (await this.comparePasswords(user.password, credentials.password))
    ) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async comparePasswords(
    hashPassword: string,
    password: string,
  ): Promise<boolean> {
    return argon2.verify(hashPassword, password);
  }

  async generateToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return jwt.sign(payload, secret, { expiresIn });
  }

  async login(user: Omit<IUser, 'password'>): Promise<Token> {
    const payload: JwtPayload = {
      name: user.username,
      sub: user._id.toString(),
    };
    return {
      accessToken: await this.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        '60s',
      ),
      refreshToken: await this.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        '1d',
      ),
    };
  }
}

export default new AuthService();
