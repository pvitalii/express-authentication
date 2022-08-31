import { Request, Response } from 'express';
import { IUser } from '../interfaces/user-interface';
import authService from '../services/auth-service';

declare global {
  namespace Express {
    interface User extends Omit<IUser, 'password'> {}
  }
}

class AuthController {
  async registration(req: Request, res: Response) {
    const token = await authService.registration(res.locals.validatedUser);
    res.cookie('accessToken', token.accessToken, {
      expires: new Date(Date.now() + 60000),
    });
    res.cookie('refreshToken', token.refreshToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).send(token);
  }

  async login(req: Request, res: Response) {
    const token = await authService.login(req.user!);
    res.cookie('accessToken', token.accessToken, {
      expires: new Date(Date.now() + 60000),
    });
    res.cookie('refreshToken', token.refreshToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).send(token);
  }

  async getProfile(req: Request, res: Response) {
    return res.status(200).send(req.user);
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json('Successfull logout');
  }
}

export default new AuthController();
