// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our database
        let user = await User.findOne({ googleId: profile.id });

        // If not, check if the email exists (user previously registered with local auth)
        if (!user && profile.emails && profile.emails.length > 0) {
          const existingUser = await User.findOne({
            email: profile.emails[0].value,
          });

          if (existingUser) {
            // Update existing user with Google ID
            existingUser.googleId = profile.id;
            existingUser.photo = profile.photos[0].value;
            existingUser.authType = "google";
            await existingUser.save();
            return done(null, existingUser);
          }
        }

        // If user doesn't exist, create a new one
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            authType: "google",
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Google auth error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
