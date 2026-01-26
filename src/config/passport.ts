import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email provided by Google"), undefined);
        }

        const user = await User.findOneAndUpdate(
          { email },
          {
            $setOnInsert: {
              email,
              username: profile.displayName
            }
          },
          { new: true, upsert: true }
        );

        return done(null, user);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);
