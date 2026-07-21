const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://localhost:5000/api/v1/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // ===============================
        // Get Google Email
        // ===============================

        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(
            new Error("Google account does not contain an email."),
            null
          );
        }

        // ===============================
        // Existing Google User
        // ===============================

        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // ===============================
        // Existing Local User
        // ===============================

        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          user.authProvider = "google";

          if (!user.profilePic) {
            user.profilePic =
              profile.photos?.[0]?.value || "";
          }

          await user.save();

          return done(null, user);
        }

        // ===============================
        // Generate Unique Username
        // ===============================

        const baseUsername = email
          .split("@")[0]
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();

        let username = baseUsername;

        while (await User.findOne({ username })) {
          username =
            baseUsername +
            Math.floor(Math.random() * 100000);
        }

        // ===============================
        // Create New User
        // ===============================

        user = await User.create({
          fullName: profile.displayName,
          username,
          email,
          profilePic: profile.photos?.[0]?.value || "",
          googleId: profile.id,
          authProvider: "google",
        });

        return done(null, user);

      } catch (error) {
        console.error("GOOGLE AUTH ERROR:", error);
        return done(error, null);
      }
    }
  )
);

// ===============================
// Serialize User
// ===============================

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ===============================
// Deserialize User
// ===============================

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);

  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;