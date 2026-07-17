const express = require("express");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

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

module.exports = router;