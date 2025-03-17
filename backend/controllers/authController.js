// authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Registration Function
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      authType: "local",
    });
    await user.save();

    // Create token immediately after registration for better UX
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// User Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if user account is Google OAuth
    if (user.authType === "google") {
      return res.status(400).json({
        msg: "This account uses Google authentication. Please sign in with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get User Profile Function
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Handle Google Authentication Success
const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Authentication failed" });
    }

    // Generate JWT token for the authenticated Google user
    const token = jwt.sign(
      { userId: req.user._id || req.user.googleId },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "24h" }
    );

    // Redirect to the client with the token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (err) {
    console.error("Google auth success error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  googleAuthSuccess,
};
