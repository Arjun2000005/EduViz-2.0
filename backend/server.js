const express = require("express");
const { MongoClient, GridFSBucket } = require("mongodb");
const cors = require("cors");
const modelRoutes = require("./routes/modelRoutes");
require("dotenv").config();

const app = express();
const port = 3000;

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/arjun";

async function startServer() {
  try {
    const client = await MongoClient.connect(mongoURI);
    console.log("Connected to MongoDB");

    const db = client.db("arjun");
    const gfs = new GridFSBucket(db, { bucketName: "models" });
    console.log("Using database:", db.databaseName);

    // Make db and gfs available to controllers via app.locals
    app.locals.db = db;
    app.locals.gfs = gfs;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/model", modelRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Run the server
startServer();
