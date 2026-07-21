const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// =======================================
// Signup
// =======================================

exports.signup = async (req, res) => {
  try {
    let { fullName, username, email, password } = req.body;

    // Validate input
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Normalize
    fullName = fullName.trim();
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();

    // Check email
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Check username
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already taken.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    const userData = user.toObject();

    delete userData.password;
    delete userData.refreshToken;

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: userData,
    });

  } catch (error) {

    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
};

// =======================================
// Login
// =======================================

exports.login = async (req, res) => {

  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    // Password is select:false in User model
    const user = await User.findOne({ email })
      .select("+password +refreshToken");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      });
    }
    if (!user.password) {
  return res.status(400).json({
    success: false,
    message:
      "This account was created using Google. Please continue with Google.",
  });
}

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(user._id);

    const userData = user.toObject();

    delete userData.password;
    delete userData.refreshToken;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: userData,
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// =======================================
// Logout
// =======================================

exports.logout = async (req, res) => {

  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });

  } catch (error) {

    console.error("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// =======================================
// Get Current User
// =======================================

exports.getCurrentUser = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,
      data: req.user,
    });

  } catch (error) {

    console.error("GET CURRENT USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};