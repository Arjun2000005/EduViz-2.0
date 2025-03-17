// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const passport = require("./config/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const modelRoutes = require("./routes/modelRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "your_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

// Use MongoDB to store sessions if in production
if (process.env.NODE_ENV === "production") {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
  });
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

const upload = multer({ storage: multer.memoryStorage() });

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/eduviz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("MongoDB connected 💚");
    const db = connection.connection.db;
    const gfs = new GridFSBucket(db, { bucketName: "models" });
    app.locals.db = db;
    app.locals.gfs = gfs;

    app.use("/api/auth", authRoutes);
    app.use("/api/models", modelRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        error: "Server error",
        message:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
