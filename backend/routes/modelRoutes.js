const express = require("express");
const router = express.Router();
const { ModelController, upload } = require("../controllers/modelController");


router.post(
  "/upload-model",
  upload.single("model"),
  ModelController.uploadModel
);
router.get("/model/:id", ModelController.getModel);
router.get("/models", ModelController.listModels);

module.exports = router;
