import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/auth-controller';
import { refreshToken } from '../middleware/refresh-token-middleware';
import { registrationValidator } from '../middleware/registration-validator';

export const AuthRouter = Router();

AuthRouter.post(
  '/registration',
  registrationValidator,
  authController.registration,
);
AuthRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  authController.login,
);
AuthRouter.get(
  '/profile',
  refreshToken,
  passport.authenticate('jwt', { session: false }),
  authController.getProfile,
);
AuthRouter.delete('/logout', authController.logout);
