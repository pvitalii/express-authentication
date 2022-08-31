import { Router } from 'express';
import { AuthRouter } from './auth-route';

export const router = Router();

router.use('/auth', AuthRouter);
