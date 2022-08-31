import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidatedUser } from '../validation/validated-user';

export async function registrationValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = new ValidatedUser();
  user.username = req.body.username;
  user.password = req.body.password;
  const errors = await validate(user);
  if (errors.length) {
    res.status(400).json(errors[0].constraints);
    next(errors);
  }
  res.locals.validatedUser = user;
  next();
}
