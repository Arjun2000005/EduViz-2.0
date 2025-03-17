// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getUserProfile,
  googleAuthSuccess,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Local auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleAuthSuccess
);

// Add test route for Google auth in Postman
router.post("/test-google-auth", async (req, res) => {
  try {
    const User = require("../models/User");
    const jwt = require("jsonwebtoken");

    const { email, name } = req.body;

    // Check if this Google user already exists
    let user = await User.findOne({ email, authType: "google" });

    if (!user) {
      // Create a mock Google user
      user = new User({
        googleId: `google_${Date.now()}`, // Generate a fake Google ID
        name: name || "Test User",
        email: email || "test@example.com",
        photo: "https://via.placeholder.com/150",
        authType: "google",
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        authType: user.authType,
      },
    });
  } catch (err) {
    console.error("Test Google auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL || "/");
  });
});

module.exports = router;
