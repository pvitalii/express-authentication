import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt-payload-interface';
import authService from '../services/auth-service';

function verifyToken<T>(token: string, secret: string) {
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const decoded = verifyToken<JwtPayload>(
    req.cookies.accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
  );
  if (!decoded && req.cookies.refreshToken) {
    const decodedRefresh = verifyToken<JwtPayload>(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    );
    const newToken = await authService.generateToken(
      { name: decodedRefresh.name, sub: decodedRefresh.sub },
      process.env.ACCESS_TOKEN_SECRET!,
      '60s',
    );
    req.cookies.accessToken = newToken;
    res.cookie('accessToken', newToken, {
      expires: new Date(Date.now() + 60000),
    });
    next();
  } else {
    next();
  }
}
