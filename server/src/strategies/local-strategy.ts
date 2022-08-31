import passport from 'passport';
import passportLocal from 'passport-local';
import authService from '../services/auth-service';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await authService.validateUser({ username, password });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }),
);
