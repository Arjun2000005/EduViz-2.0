const express = require("express");
const multer = require("multer");
const {
  preload,
  chat,
  uploadModel,
  getModel,
  getModels,
} = require("../controllers/modelController");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Define routes
router.post("/preload", preload);
router.post("/chat", chat);
router.post("/upload-model", upload.single("model"), uploadModel);
router.get("/model/:id", getModel);
router.get("/models", getModels);

module.exports = router;
