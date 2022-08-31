import { Request } from 'express';
import passport from 'passport';
import passportJwt, { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload-interface';

const JwtStrategy = passportJwt.Strategy;

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.accessToken;
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    async (payload: JwtPayload, done) => {
      const user = { _id: payload.sub, username: payload.name };
      return done(null, user);
    },
  ),
);
