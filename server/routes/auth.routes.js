const express = require("express");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();
const session = require("express-session");
const passport = require("../config/passport");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/auth.controller");


router.post("/signup", signup);

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

// =======================================
// Google Login
// =======================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// =======================================
// Google Callback
// =======================================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),

  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(
  `${process.env.CLIENT_URL}/google-success?token=${token}`

      );
    } catch (err) {
      console.error(err);

      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

module.exports = router;