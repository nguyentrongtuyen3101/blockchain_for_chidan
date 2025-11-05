import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleConfig} from './auth.js';
import AuthService from '../modules/auth/auth.service.js';

// GOOGLE
passport.use(
  new GoogleStrategy(
    googleConfig,
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile);
        const result = await AuthService.loginWithGoogle(profile);
        return done(null, result); 
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
